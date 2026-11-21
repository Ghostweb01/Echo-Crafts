import React, { useState } from 'react';
import { CheckCircle2, Download, RotateCcw, Volume2, Mic } from 'lucide-react';
import {
  ALL_LESSONS,
  LANGUAGES,
  SKILL_TRACKS,
  getLessonById,
} from '../data/curriculum';
import { LanguageCode, LearnerProgress } from '../types/curriculum';
import {
  calculateStreakDays,
  exportProgressJson,
  loadVoiceRecording,
} from '../services/offlineStorage';

interface ProgressDashboardProps {
  language: LanguageCode;
  progress: LearnerProgress;
  onOpenLesson: (lessonId: string) => void;
  onResetProgress: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  language,
  progress,
  onOpenLesson,
  onResetProgress,
}) => {
  const [confirmReset, setConfirmReset] = useState(false);
  const [playingClipId, setPlayingClipId] = useState<string | null>(null);

  const totalLessons = ALL_LESSONS.length;
  const completedCount = progress.completedLessons.length;
  const overallPct = Math.round((completedCount / totalLessons) * 100);
  const streakDays = calculateStreakDays(progress.activeDates);
  const passedVerifications = progress.verifications.filter((v) => v.passed);

  const handlePlaySavedClip = async (recordId: string, audioBlobKey?: string) => {
    if (!audioBlobKey) return;
    const blob = await loadVoiceRecording(audioBlobKey);
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    setPlayingClipId(recordId);
    audio.onended = () => {
      setPlayingClipId(null);
      URL.revokeObjectURL(url);
    };
    audio.play().catch(() => setPlayingClipId(null));
  };

  return (
    <div className="space-y-8 pb-20 md:pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2E7E4] dark:border-[#28342E] pb-5">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#141A17] dark:text-[#ECF2EE]">
            Learner Progress & Voice Verification Log
          </h1>
          <p className="mt-1 text-sm text-[#425049] dark:text-[#B5C4BC]">
            All completed modules, practice exercises, and spoken verification recordings are stored locally in IndexedDB.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => exportProgressJson(progress, progress.verifications)}
            className="min-h-[44px] px-4 py-2 rounded-xl border border-[#CBD5D0] dark:border-[#324039] bg-white dark:bg-[#151C19] text-xs sm:text-sm font-medium text-[#141A17] dark:text-[#ECF2EE] hover:bg-[#F0F4F2] dark:hover:bg-[#1C2521] inline-flex items-center gap-2 whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>Export Record (JSON)</span>
          </button>

          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="min-h-[44px] px-4 py-2 rounded-xl border border-[#CBD5D0] dark:border-[#324039] bg-white dark:bg-[#151C19] text-xs sm:text-sm font-medium text-[#5A6760] dark:text-[#9BB0A5] hover:text-[#141A17] dark:hover:text-[#ECF2EE] inline-flex items-center gap-2 whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Progress</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setConfirmReset(false);
                }}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-[#DC2626] text-white text-xs font-semibold"
              >
                Confirm Reset
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="min-h-[44px] px-3 py-2 rounded-xl border border-[#CBD5D0] dark:border-[#324039] text-xs font-medium text-[#141A17] dark:text-[#ECF2EE]"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-6">
          <p className="text-xs font-medium text-[#5A6760] dark:text-[#8FA398]">Overall Mastery</p>
          <p className="mt-2 font-mono text-3xl font-semibold text-[#141A17] dark:text-[#ECF2EE] tabular-nums">
            {overallPct}%
          </p>
          <div className="mt-3 h-2 rounded-full bg-[#EBF0ED] dark:bg-[#24302A] overflow-hidden">
            <div className="h-full bg-[#047857] dark:bg-[#10B981]" style={{ width: `${overallPct}%` }} />
          </div>
          <p className="mt-2 text-xs text-[#425049] dark:text-[#B5C4BC] tabular-nums">
            {completedCount} of {totalLessons} lessons finished
          </p>
        </div>

        <div className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-6">
          <p className="text-xs font-medium text-[#5A6760] dark:text-[#8FA398]">Voice Checks Passed</p>
          <p className="mt-2 font-mono text-3xl font-semibold text-[#047857] dark:text-[#34D399] tabular-nums">
            {passedVerifications.length}
          </p>
          <p className="mt-2 text-xs text-[#425049] dark:text-[#B5C4BC] tabular-nums">
            Out of {progress.verifications.length} total voice attempts
          </p>
        </div>

        <div className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-6">
          <p className="text-xs font-medium text-[#5A6760] dark:text-[#8FA398]">Study Streak</p>
          <p className="mt-2 font-mono text-3xl font-semibold text-[#141A17] dark:text-[#ECF2EE] tabular-nums">
            {streakDays} {streakDays === 1 ? 'Day' : 'Days'}
          </p>
          <p className="mt-2 text-xs text-[#425049] dark:text-[#B5C4BC]">
            Synced offline in browser storage
          </p>
        </div>
      </div>

      {/* Per-Track Mastery Matrix */}
      <section className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-6 space-y-6">
        <h2 className="font-display text-xl font-bold text-[#141A17] dark:text-[#ECF2EE]">
          Curriculum Mastery by Track
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SKILL_TRACKS.map((track) => {
            const done = track.lessons.filter((l) =>
              progress.completedLessons.includes(l.id)
            ).length;
            const pct = Math.round((done / track.lessons.length) * 100);
            return (
              <div key={track.id} className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="font-semibold text-[#141A17] dark:text-[#ECF2EE]">{track.title[language]}</span>
                  <span className="font-mono text-xs text-[#047857] dark:text-[#34D399] font-semibold tabular-nums">
                    {pct}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[#EBF0ED] dark:bg-[#24302A] overflow-hidden">
                  <div className="h-full bg-[#047857] dark:bg-[#10B981]" style={{ width: `${pct}%` }} />
                </div>

                <div className="divide-y divide-[#EFF3F1] dark:divide-[#24302A] pt-1">
                  {track.lessons.map((lesson) => {
                    const isPracticeDone = progress.completedPractices.includes(lesson.id);
                    const isVoiceDone = progress.verifications.some(
                      (v) => v.lessonId === lesson.id && v.passed
                    );
                    const isLessonDone = progress.completedLessons.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => onOpenLesson(lesson.id)}
                        className="w-full py-2.5 flex items-center justify-between gap-3 text-left hover:bg-[#F7F9F8] dark:hover:bg-[#1C2521] -mx-2 px-2 rounded-lg transition-colors min-h-[44px]"
                      >
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-[#141A17] dark:text-[#ECF2EE] truncate">
                            0{lesson.order}. {lesson.title[language]}
                          </p>
                          <p className="text-[11px] text-[#5A6760] dark:text-[#8FA398] mt-0.5">
                            {isPracticeDone ? 'Practice done' : 'Practice pending'}
                            {' · '}
                            {isVoiceDone ? 'Voice verified' : 'Voice pending'}
                          </p>
                        </div>
                        {isLessonDone ? (
                          <CheckCircle2 className="w-4 h-4 text-[#047857] dark:text-[#34D399] shrink-0" />
                        ) : (
                          <span className="text-xs font-medium text-[#5A6760] dark:text-[#8FA398] shrink-0">Open</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Voice Verification Audit History */}
      <section className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-bold text-[#141A17] dark:text-[#ECF2EE]">
            Voice-to-Text Verification History
          </h2>
          <span className="text-xs text-[#5A6760] dark:text-[#8FA398] tabular-nums">
            {progress.verifications.length} recorded attempts
          </span>
        </div>

        {progress.verifications.length === 0 ? (
          <div className="py-10 text-center border border-dashed border-[#CBD5D0] dark:border-[#324039] rounded-xl space-y-2">
            <Mic className="w-7 h-7 text-[#5A6760] dark:text-[#8FA398] mx-auto" />
            <p className="text-sm font-medium text-[#141A17] dark:text-[#ECF2EE]">
              No voice verifications recorded yet
            </p>
            <p className="text-xs text-[#5A6760] dark:text-[#8FA398]">
              Open any lesson in the Studio and speak your summary aloud to log a verification.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#EFF3F1] dark:divide-[#24302A]">
            {progress.verifications.map((rec) => {
              const lesson = getLessonById(rec.lessonId);
              const langName = LANGUAGES.find((l) => l.code === rec.language)?.nativeName ?? rec.language;
              return (
                <div key={rec.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#5A6760] dark:text-[#8FA398] tabular-nums">
                      <span className="font-semibold text-[#141A17] dark:text-[#ECF2EE]">
                        {lesson.title[language]}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{langName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{new Date(rec.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-[#425049] dark:text-[#B5C4BC]">“{rec.transcript}”</p>
                    <p className="text-xs text-[#5A6760] dark:text-[#8FA398]">
                      Matched: {rec.matchedKeywords.join(', ') || 'None'}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {rec.audioBlobKey && (
                      <button
                        type="button"
                        onClick={() => handlePlaySavedClip(rec.id, rec.audioBlobKey)}
                        className="min-h-[38px] px-3 py-1.5 rounded-lg border border-[#CBD5D0] dark:border-[#324039] text-xs font-medium text-[#141A17] dark:text-[#ECF2EE] hover:bg-[#F0F4F2] dark:hover:bg-[#1C2521] inline-flex items-center gap-1.5"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-[#047857] dark:text-[#34D399]" />
                        <span>{playingClipId === rec.id ? 'Playing...' : 'Replay Voice'}</span>
                      </button>
                    )}

                    <span
                      className={`font-mono text-xs font-semibold tabular-nums ${
                        rec.passed
                          ? 'text-[#047857] dark:text-[#34D399]'
                          : 'text-[#B45309] dark:text-[#FBBF24]'
                      }`}
                    >
                      {rec.scorePercent}% · {rec.passed ? 'PASSED' : 'RETRY'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
