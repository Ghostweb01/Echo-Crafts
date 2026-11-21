import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Square,
  RotateCcw,
  Mic,
  MicOff,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Volume2,
  AudioLines,
} from 'lucide-react';
import {
  ALL_LESSONS,
  LANGUAGES,
  getLessonById,
  getTrackById,
} from '../data/curriculum';
import {
  LanguageCode,
  LearnerProgress,
  VoiceVerificationRecord,
} from '../types/curriculum';
import {
  checkVoiceAvailability,
  evaluateSpokenTranscript,
  speakLessonText,
  startLiveSpeechRecognition,
  stopSpokenLesson,
} from '../services/speechEngine';
import { saveVoiceRecording } from '../services/offlineStorage';
import { InteractivePractice } from './InteractivePractice';

interface LessonStudioProps {
  lessonId: string;
  language: LanguageCode;
  progress: LearnerProgress;
  isOffline: boolean;
  onSelectLanguage: (lang: LanguageCode) => void;
  onChangeSpeechRate: (rate: number) => void;
  onSelectLesson: (lessonId: string) => void;
  onCompletePractice: (lessonId: string) => void;
  onRecordVerification: (record: VoiceVerificationRecord) => void;
  onBackToTracks: () => void;
}

export const LessonStudio: React.FC<LessonStudioProps> = ({
  lessonId,
  language,
  progress,
  isOffline,
  onSelectLanguage,
  onChangeSpeechRate,
  onSelectLesson,
  onCompletePractice,
  onRecordVerification,
  onBackToTracks,
}) => {
  const lesson = getLessonById(lessonId);
  const track = getTrackById(lesson.trackId);
  const currentIdx = ALL_LESSONS.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIdx > 0 ? ALL_LESSONS[currentIdx - 1] : null;
  const nextLesson = currentIdx < ALL_LESSONS.length - 1 ? ALL_LESSONS[currentIdx + 1] : null;

  const [segmentIdx, setSegmentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [spokenCharPos, setSpokenCharPos] = useState(0);
  const [showPhonetics, setShowPhonetics] = useState(true);

  // Voice verification state
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState('');
  const [micError, setMicError] = useState<string | null>(null);
  const [micLevel, setMicLevel] = useState(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<VoiceVerificationRecord | null>(null);
  const [manualText, setManualText] = useState('');

  const stopSpeechRef = useRef<(() => void) | null>(null);
  const stopRecognitionRef = useRef<(() => void) | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const latestAudioBlobRef = useRef<Blob | null>(null);

  const voiceCaps = checkVoiceAvailability(language);
  const segment = lesson.segments[segmentIdx] ?? lesson.segments[0];
  const segContent = segment.content[language];
  const challenge = lesson.voiceChallenge;
  const practiceDone = progress.completedPractices.includes(lesson.id);
  const lessonVerified = progress.verifications.some(
    (v) => v.lessonId === lesson.id && v.passed
  );

  useEffect(() => {
    setSegmentIdx(0);
    setSpokenCharPos(0);
    setIsPlaying(false);
    setLiveTranscript('');
    setManualText('');
    setMicError(null);
    setLastResult(null);
    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
      setRecordedAudioUrl(null);
    }
    latestAudioBlobRef.current = null;
    stopSpokenLesson();
    stopSpeechRef.current?.();
  }, [lessonId]);

  useEffect(() => {
    stopSpokenLesson();
    stopSpeechRef.current?.();
    setIsPlaying(false);
    setSpokenCharPos(0);
  }, [language]);

  useEffect(() => {
    return () => {
      stopSpokenLesson();
      stopSpeechRef.current?.();
      stopRecognitionRef.current?.();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopSpokenLesson();
      stopSpeechRef.current?.();
      setIsPlaying(false);
      return;
    }

    setSpokenCharPos(0);
    setIsPlaying(true);
    stopSpeechRef.current = speakLessonText(
      segContent.spokenText,
      language,
      progress.speechRate,
      {
        onStart: () => setIsPlaying(true),
        onWordIndex: (idx) => setSpokenCharPos(idx),
        onEnd: () => {
          setIsPlaying(false);
          setSpokenCharPos(segContent.spokenText.length);
        },
        onError: () => setIsPlaying(false),
      }
    );
  };

  const stopRecordingSession = () => {
    stopRecognitionRef.current?.();
    stopRecognitionRef.current = null;

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    mediaStreamRef.current = null;
    setMicLevel(0);
    setIsRecording(false);
  };

  const handleStartVoiceCapture = async () => {
    if (isRecording) {
      stopRecordingSession();
      return;
    }

    // Stop lesson audio before listening
    if (isPlaying) {
      stopSpokenLesson();
      stopSpeechRef.current?.();
      setIsPlaying(false);
    }

    setMicError(null);
    setLastResult(null);
    setLiveTranscript('');
    audioChunksRef.current = [];
    latestAudioBlobRef.current = null;
    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
      setRecordedAudioUrl(null);
    }

    // 1. Capture microphone stream for real audio level meter + offline recording
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const source = ctx.createMediaStreamSource(stream);
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 64;
          source.connect(analyser);
          const data = new Uint8Array(analyser.frequencyBinCount);
          const tick = () => {
            analyser.getByteFrequencyData(data);
            const avg = data.reduce((a, b) => a + b, 0) / data.length;
            setMicLevel(Math.min(100, Math.round((avg / 140) * 100)));
            animFrameRef.current = requestAnimationFrame(tick);
          };
          tick();
        }

        if (typeof MediaRecorder !== 'undefined') {
          const recorder = new MediaRecorder(stream);
          recorder.ondataavailable = (e) => {
            if (e.data.size > 0) audioChunksRef.current.push(e.data);
          };
          recorder.onstop = () => {
            const blob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
            latestAudioBlobRef.current = blob;
            setRecordedAudioUrl(URL.createObjectURL(blob));
          };
          recorder.start();
          mediaRecorderRef.current = recorder;
        }
      } catch {
        setMicError(
          'Microphone permission is blocked or unavailable in this browser. You can still type or test your spoken answer below.'
        );
      }
    }

    // 2. Start live Web Speech API recognition
    const stopRec = startLiveSpeechRecognition(language, {
      onTranscript: (text) => {
        setLiveTranscript(text);
      },
      onError: (reason) => {
        setMicError(reason);
      },
      onEnd: () => {
        // Keep audio recorder running until user stops, or mark finished if no media stream
        if (!mediaStreamRef.current) {
          setIsRecording(false);
        }
      },
    });

    if (!stopRec) {
      setMicError(
        isOffline
          ? 'Browser voice-to-text is unavailable offline on this device. Your voice clip is recording locally—confirm via Oral Check or Typed Transcript below.'
          : 'Live speech-to-text is not supported in this browser. Your voice clip is recording locally—confirm via Oral Check or Typed Transcript below.'
      );
    } else {
      stopRecognitionRef.current = stopRec;
    }

    setIsRecording(true);
  };

  const finalizeVerification = async (
    transcriptText: string,
    mode: VoiceVerificationRecord['mode']
  ) => {
    if (isRecording) stopRecordingSession();

    const evalRes = evaluateSpokenTranscript(
      transcriptText,
      challenge.keywords[language]
    );

    const recordId = `ver-${Date.now()}`;
    let audioBlobKey: string | undefined;
    if (latestAudioBlobRef.current && latestAudioBlobRef.current.size > 0) {
      audioBlobKey = recordId;
      await saveVoiceRecording(audioBlobKey, latestAudioBlobRef.current);
    }

    const record: VoiceVerificationRecord = {
      id: recordId,
      lessonId: lesson.id,
      trackId: lesson.trackId,
      language,
      transcript: transcriptText.trim(),
      matchedKeywords: evalRes.matchedKeywords,
      missedKeywords: evalRes.missedKeywords,
      scorePercent: evalRes.scorePercent,
      passed: evalRes.passed,
      mode,
      createdAt: new Date().toISOString(),
      audioBlobKey,
    };

    setLastResult(record);
    onRecordVerification(record);
  };

  const confirmOralRecordingOffline = async () => {
    const keywords = challenge.keywords[language];
    const recordId = `ver-${Date.now()}`;
    let audioBlobKey: string | undefined;
    if (latestAudioBlobRef.current && latestAudioBlobRef.current.size > 0) {
      audioBlobKey = recordId;
      await saveVoiceRecording(audioBlobKey, latestAudioBlobRef.current);
    }

    const record: VoiceVerificationRecord = {
      id: recordId,
      lessonId: lesson.id,
      trackId: lesson.trackId,
      language,
      transcript: `[Offline oral recording verified] ${challenge.expectedPhrase[language]}`,
      matchedKeywords: keywords,
      missedKeywords: [],
      scorePercent: 100,
      passed: true,
      mode: 'oral-recording',
      createdAt: new Date().toISOString(),
      audioBlobKey,
    };
    setLastResult(record);
    onRecordVerification(record);
  };

  const activeText = segContent.spokenText;
  const spokenPrefix = activeText.slice(0, spokenCharPos);
  const spokenSuffix = activeText.slice(spokenCharPos);

  return (
    <div className="space-y-8 pb-20 md:pb-12">
      {/* Studio Breadcrumb & Language Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E7E4] dark:border-[#28342E] pb-5">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onBackToTracks}
            className="min-h-[40px] px-3 py-1.5 rounded-xl border border-[#CBD5D0] dark:border-[#324039] bg-white dark:bg-[#151C19] text-xs sm:text-sm font-medium text-[#141A17] dark:text-[#ECF2EE] hover:bg-[#F0F4F2] dark:hover:bg-[#1C2521] inline-flex items-center gap-1.5 shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>All Tracks</span>
          </button>
          <div className="min-w-0 text-xs sm:text-sm text-[#5A6760] dark:text-[#8FA398] truncate">
            <span>{track.title[language]}</span>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-[#141A17] dark:text-[#ECF2EE] font-medium">Lesson 0{lesson.order}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EBF0ED] dark:bg-[#1C2521] rounded-xl self-start md:self-auto">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => onSelectLanguage(lang.code)}
              className={`min-h-[36px] px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                language === lang.code
                  ? 'bg-white dark:bg-[#151C19] text-[#141A17] dark:text-[#ECF2EE] shadow-sm'
                  : 'text-[#4B5851] dark:text-[#9BB0A5] hover:text-[#141A17] dark:hover:text-[#ECF2EE]'
              }`}
            >
              {lang.nativeName}
            </button>
          ))}
        </div>
      </div>

      {/* Two-Zone Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left/Top Interactive Stage (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Spoken Audio Stage */}
          <section className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#5A6760] dark:text-[#8FA398] tabular-nums">
                <span>Lesson 0{lesson.order}</span>
                <span aria-hidden="true">·</span>
                <span>{lesson.durationMin} min</span>
                <span aria-hidden="true">·</span>
                <span>
                  Segment {segmentIdx + 1} of {lesson.segments.length}
                </span>
                {lessonVerified && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-[#047857] dark:text-[#34D399]">Voice Verified</span>
                  </>
                )}
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#141A17] dark:text-[#ECF2EE] text-balance">
                {lesson.title[language]}
              </h1>
              <p className="text-sm sm:text-base text-[#425049] dark:text-[#B5C4BC]">
                {lesson.summary[language]}
              </p>
            </div>

            {/* Segment Switcher */}
            {lesson.segments.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {lesson.segments.map((seg, idx) => (
                  <button
                    key={seg.id}
                    type="button"
                    onClick={() => {
                      stopSpokenLesson();
                      setIsPlaying(false);
                      setSpokenCharPos(0);
                      setSegmentIdx(idx);
                    }}
                    className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      segmentIdx === idx
                        ? 'bg-[#141A17] dark:bg-[#ECF2EE] text-white dark:text-[#141A17]'
                        : 'bg-[#EFF3F1] dark:bg-[#1C2521] text-[#425049] dark:text-[#B5C4BC] hover:text-[#141A17] dark:hover:text-[#ECF2EE]'
                    }`}
                  >
                    0{idx + 1}. {seg.title[language]}
                  </button>
                ))}
              </div>
            )}

            {/* Synchronized Spoken Script Display */}
            <div className="p-5 rounded-xl bg-[#F4F7F5] dark:bg-[#1C2521] border border-[#E2E7E4] dark:border-[#28342E] space-y-3">
              <div className="flex items-center justify-between gap-2 text-xs text-[#5A6760] dark:text-[#8FA398]">
                <span className="font-semibold text-[#141A17] dark:text-[#ECF2EE] inline-flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-[#047857] dark:text-[#34D399]" />
                  <span>{segment.title[language]}</span>
                </span>
                <span className="tabular-nums">
                  {voiceCaps.hasNativeVoiceForLanguage
                    ? `Device voice: ${voiceCaps.matchedVoiceName}`
                    : 'Guided caption + fallback speech'}
                </span>
              </div>

              <p className="text-base sm:text-lg leading-relaxed text-[#141A17] dark:text-[#ECF2EE]">
                {isPlaying && spokenCharPos > 0 ? (
                  <>
                    <span className="bg-[#D1FAE5] dark:bg-[#065F46] text-[#064E3B] dark:text-[#ECFDF5] rounded px-0.5">{spokenPrefix}</span>
                    <span>{spokenSuffix}</span>
                  </>
                ) : (
                  activeText
                )}
              </p>

              {showPhonetics && (
                <p className="text-xs sm:text-sm text-[#4B5851] dark:text-[#9BB0A5] pt-2 border-t border-[#E2E7E4] dark:border-[#28342E]">
                  <span className="font-semibold text-[#141A17] dark:text-[#ECF2EE]">Pronunciation guide: </span>
                  {segContent.phoneticGuide}
                </p>
              )}

              <p className="text-xs sm:text-sm font-medium text-[#047857] dark:text-[#34D399]">
                Key takeaway: {segContent.keyTakeaway}
              </p>
            </div>

            {/* Spoken Audio Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="min-h-[48px] px-5 py-2.5 rounded-xl bg-[#047857] text-white text-sm font-semibold hover:bg-[#065F46] transition-colors inline-flex items-center gap-2"
                >
                  {isPlaying ? (
                    <>
                      <Square className="w-4 h-4 fill-current" />
                      <span>Stop Audio</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Listen in {LANGUAGES.find((l) => l.code === language)?.nativeName}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    stopSpokenLesson();
                    setSpokenCharPos(0);
                    setIsPlaying(false);
                  }}
                  className="min-h-[44px] px-3.5 py-2 rounded-xl border border-[#CBD5D0] dark:border-[#324039] text-xs font-medium text-[#425049] dark:text-[#B5C4BC] hover:text-[#141A17] dark:hover:text-[#ECF2EE] inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 p-1 bg-[#EFF3F1] dark:bg-[#1C2521] rounded-xl" role="group" aria-label="Speech speed">
                  {[0.8, 1.0, 1.2].map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => onChangeSpeechRate(spd)}
                      className={`min-h-[36px] px-2.5 py-1 rounded-lg font-mono text-xs font-medium tabular-nums ${
                        progress.speechRate === spd
                          ? 'bg-white dark:bg-[#151C19] text-[#141A17] dark:text-[#ECF2EE] shadow-sm'
                          : 'text-[#5A6760] dark:text-[#8FA398] hover:text-[#141A17] dark:hover:text-[#ECF2EE]'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setShowPhonetics((v) => !v)}
                  className="min-h-[38px] px-3 py-1.5 rounded-xl border border-[#CBD5D0] dark:border-[#324039] text-xs font-medium text-[#425049] dark:text-[#B5C4BC] hover:text-[#141A17] dark:hover:text-[#ECF2EE]"
                >
                  {showPhonetics ? 'Hide Phonetics' : 'Show Phonetics'}
                </button>
              </div>
            </div>
          </section>

          {/* Interactive Skill Exercise */}
          <InteractivePractice
            kind={lesson.practiceKind}
            isCompleted={practiceDone}
            onComplete={() => onCompletePractice(lesson.id)}
          />
        </div>

        {/* Right/Bottom Verification Deck (5 cols) */}
        <aside className="lg:col-span-5 space-y-6">
          <section className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-6 space-y-5">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-display text-xl font-bold text-[#141A17] dark:text-[#ECF2EE]">
                  Voice-to-Text Verification
                </h2>
                <AudioLines className="w-5 h-5 text-[#047857] dark:text-[#34D399] shrink-0" />
              </div>
              <p className="text-sm text-[#425049] dark:text-[#B5C4BC]">
                {challenge.prompt[language]}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F4F7F5] dark:bg-[#1C2521] border border-[#E2E7E4] dark:border-[#28342E] space-y-2">
              <p className="text-xs font-semibold text-[#5A6760] dark:text-[#8FA398]">Target Phrase ({LANGUAGES.find((l) => l.code === language)?.nativeName})</p>
              <p className="text-sm font-medium text-[#141A17] dark:text-[#ECF2EE] leading-relaxed">
                “{challenge.expectedPhrase[language]}”
              </p>
              <p className="text-xs text-[#4B5851] dark:text-[#9BB0A5]">{challenge.phoneticHint[language]}</p>
            </div>

            {/* Microphone Capture Controls */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleStartVoiceCapture}
                className={`w-full min-h-[52px] px-5 py-3 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2.5 transition-colors ${
                  isRecording
                    ? 'bg-[#B45309] text-white hover:bg-[#92400E]'
                    : 'bg-[#047857] text-white hover:bg-[#065F46]'
                }`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-4 h-4 shrink-0" />
                    <span>Stop Listening</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 shrink-0" />
                    <span>Speak Answer Now</span>
                  </>
                )}
              </button>

              {/* Real Web Audio Analyser Input Level Bar */}
              {isRecording && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#425049] dark:text-[#B5C4BC] tabular-nums">
                    <span>Microphone Input Active</span>
                    <span className="font-mono">{micLevel}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#E2E7E4] dark:bg-[#24302A] overflow-hidden">
                    <div
                      className="h-full bg-[#047857] dark:bg-[#10B981] transition-all duration-100"
                      style={{ width: `${Math.max(6, micLevel)}%` }}
                    />
                  </div>
                </div>
              )}

              {micError && (
                <div className="p-3 rounded-xl bg-[#FFFBEB] dark:bg-[#451A03]/60 border border-[#FDE68A] dark:border-[#78350F] text-xs text-[#92400E] dark:text-[#FDE68A] flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{micError}</span>
                </div>
              )}
            </div>

            {/* Live Transcript Capture */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#5A6760] dark:text-[#8FA398]">
                <span className="font-semibold text-[#141A17] dark:text-[#ECF2EE]">Captured Voice Transcript</span>
                <span>{liveTranscript ? 'Live STT active' : 'Waiting for voice'}</span>
              </div>
              <div className="min-h-[76px] p-3.5 rounded-xl border border-[#E2E7E4] dark:border-[#28342E] bg-[#FAFBFB] dark:bg-[#1C2521] text-sm text-[#141A17] dark:text-[#ECF2EE]">
                {liveTranscript || (
                  <span className="text-[#728078] dark:text-[#7E9287]">
                    Tap “Speak Answer Now” and say the key rule aloud in {LANGUAGES.find((l) => l.code === language)?.nativeName}.
                  </span>
                )}
              </div>

              {liveTranscript.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => finalizeVerification(liveTranscript, 'speech-recognition')}
                  className="w-full min-h-[44px] px-4 py-2 rounded-xl bg-[#141A17] dark:bg-[#ECF2EE] text-white dark:text-[#141A17] text-sm font-semibold hover:bg-[#27312C] dark:hover:bg-[#D5E0DA] transition-colors"
                >
                  Verify Voice Transcript
                </button>
              )}
            </div>

            {/* Recorded Audio Self-Playback & Offline Oral Check */}
            {recordedAudioUrl && (
              <div className="p-4 rounded-xl border border-[#E2E7E4] dark:border-[#28342E] bg-[#F7F9F8] dark:bg-[#1C2521] space-y-3">
                <p className="text-xs font-semibold text-[#141A17] dark:text-[#ECF2EE]">
                  Recorded Voice Clip (Saved Offline)
                </p>
                <audio controls src={recordedAudioUrl} className="w-full h-10" />
                {!liveTranscript && (
                  <button
                    type="button"
                    onClick={confirmOralRecordingOffline}
                    className="w-full min-h-[44px] px-4 py-2 rounded-xl border border-[#047857] dark:border-[#34D399] text-[#047857] dark:text-[#34D399] bg-white dark:bg-[#151C19] text-xs font-semibold hover:bg-[#ECFDF5] dark:hover:bg-[#132A21] transition-colors"
                  >
                    Confirm Oral Recording Matches Target Phrase
                  </button>
                )}
              </div>
            )}

            {/* Offline / Typed Verification Fallback */}
            <div className="pt-4 border-t border-[#E2E7E4] dark:border-[#28342E] space-y-2.5">
              <label htmlFor="manual-transcript" className="block text-xs font-semibold text-[#5A6760] dark:text-[#8FA398]">
                Offline / Keyboard Practice Fallback
              </label>
              <div className="flex gap-2">
                <input
                  id="manual-transcript"
                  type="text"
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  placeholder={`Type phrase in ${LANGUAGES.find((l) => l.code === language)?.nativeName}...`}
                  className="flex-1 min-h-[44px] px-3.5 py-2 rounded-xl border border-[#CBD5D0] dark:border-[#324039] bg-white dark:bg-[#1C2521] text-sm text-[#141A17] dark:text-[#ECF2EE] placeholder:text-[#728078] dark:placeholder:text-[#7E9287] focus:outline-none focus:border-[#047857]"
                />
                <button
                  type="button"
                  disabled={!manualText.trim()}
                  onClick={() => finalizeVerification(manualText, 'typed-fallback')}
                  className="min-h-[44px] px-4 py-2 rounded-xl border border-[#CBD5D0] dark:border-[#324039] bg-white dark:bg-[#1C2521] text-xs font-semibold text-[#141A17] dark:text-[#ECF2EE] hover:bg-[#F0F4F2] dark:hover:bg-[#24302A] disabled:opacity-40 shrink-0"
                >
                  Check
                </button>
              </div>
            </div>

            {/* Verification Feedback */}
            {lastResult && (
              <div
                className={`p-4 rounded-xl border space-y-2 ${
                  lastResult.passed
                    ? 'bg-[#ECFDF5] dark:bg-[#064E3B]/40 border-[#A7F3D0] dark:border-[#047857] text-[#064E3B] dark:text-[#A7F3D0]'
                    : 'bg-[#FFFBEB] dark:bg-[#451A03]/60 border-[#FDE68A] dark:border-[#78350F] text-[#92400E] dark:text-[#FDE68A]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold inline-flex items-center gap-1.5">
                    {lastResult.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#047857] dark:text-[#34D399]" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-[#B45309] dark:text-[#FBBF24]" />
                    )}
                    <span>
                      {lastResult.passed ? 'Verification Passed' : 'Try Speaking Again'}
                    </span>
                  </span>
                  <span className="font-mono text-sm font-semibold tabular-nums">
                    {lastResult.scorePercent}%
                  </span>
                </div>

                <p className="text-xs">
                  Matched keywords:{' '}
                  {lastResult.matchedKeywords.length > 0
                    ? lastResult.matchedKeywords.join(', ')
                    : 'None yet'}
                </p>
                {lastResult.missedKeywords.length > 0 && (
                  <p className="text-xs">
                    Try including: {lastResult.missedKeywords.join(', ')}
                  </p>
                )}
              </div>
            )}
          </section>

          {/* Lesson Navigation */}
          <div className="flex items-center justify-between gap-3">
            {prevLesson ? (
              <button
                type="button"
                onClick={() => onSelectLesson(prevLesson.id)}
                className="min-h-[44px] px-4 py-2 rounded-xl border border-[#CBD5D0] dark:border-[#324039] bg-white dark:bg-[#151C19] text-xs sm:text-sm font-medium text-[#141A17] dark:text-[#ECF2EE] hover:bg-[#F0F4F2] dark:hover:bg-[#1C2521] inline-flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            ) : (
              <div />
            )}

            {nextLesson && (
              <button
                type="button"
                onClick={() => onSelectLesson(nextLesson.id)}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-[#141A17] dark:bg-[#ECF2EE] text-white dark:text-[#141A17] text-xs sm:text-sm font-semibold hover:bg-[#27312C] dark:hover:bg-[#D5E0DA] inline-flex items-center gap-1.5"
              >
                <span>Next Lesson</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
