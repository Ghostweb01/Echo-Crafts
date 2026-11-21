import { LANGUAGES } from '../data/curriculum';
import { LanguageCode } from '../types/curriculum';

export interface VoiceAvailability {
  hasSpeechSynthesis: boolean;
  hasSpeechRecognition: boolean;
  hasNativeVoiceForLanguage: boolean;
  matchedVoiceName: string | null;
}

interface SpeechRecognitionAlternativeLike {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionEventLike extends Event {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: SpeechRecognitionResultLike;
  };
}

interface SpeechRecognitionErrorEventLike extends Event {
  error: string;
}

interface SpeechRecognitionLike extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

function getSpeechRecognitionCtor(): SpeechRecognitionConstructor | null {
  if (typeof window === 'undefined') return null;
  const win = window as unknown as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return win.SpeechRecognition || win.webkitSpeechRecognition || null;
}

export function getBcp47ForLanguage(code: LanguageCode): string {
  return LANGUAGES.find((l) => l.code === code)?.bcp47 ?? 'en-US';
}

export function checkVoiceAvailability(language: LanguageCode): VoiceAvailability {
  const hasSpeechSynthesis = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const hasSpeechRecognition = getSpeechRecognitionCtor() !== null;
  const bcp = getBcp47ForLanguage(language);
  const shortLang = bcp.split('-')[0].toLowerCase();

  let matchedVoiceName: string | null = null;
  if (hasSpeechSynthesis) {
    const voices = window.speechSynthesis.getVoices();
    const exact = voices.find((v) => v.lang.toLowerCase() === bcp.toLowerCase());
    const prefix = voices.find((v) => v.lang.toLowerCase().startsWith(shortLang));
    const chosen = exact || prefix;
    if (chosen) matchedVoiceName = chosen.name;
  }

  return {
    hasSpeechSynthesis,
    hasSpeechRecognition,
    hasNativeVoiceForLanguage: matchedVoiceName !== null,
    matchedVoiceName,
  };
}

export function stopSpokenLesson(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function speakLessonText(
  text: string,
  language: LanguageCode,
  rate: number,
  callbacks: {
    onStart?: () => void;
    onWordIndex?: (charIndex: number) => void;
    onEnd?: () => void;
    onError?: () => void;
  }
): () => void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    callbacks.onStart?.();
    const timer = globalThis.setTimeout(() => callbacks.onEnd?.(), Math.max(2500, text.length * 45));
    return () => globalThis.clearTimeout(timer);
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const bcp = getBcp47ForLanguage(language);
  const shortLang = bcp.split('-')[0].toLowerCase();
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice =
    voices.find((v) => v.lang.toLowerCase() === bcp.toLowerCase()) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(shortLang)) ||
    null;

  if (matchedVoice) {
    utterance.voice = matchedVoice;
    utterance.lang = matchedVoice.lang;
  } else {
    utterance.lang = bcp;
  }
  utterance.rate = rate;
  utterance.pitch = 1.0;

  let finished = false;
  const finishOnce = () => {
    if (!finished) {
      finished = true;
      callbacks.onEnd?.();
    }
  };

  utterance.onstart = () => callbacks.onStart?.();
  utterance.onboundary = (e) => {
    if (typeof e.charIndex === 'number') {
      callbacks.onWordIndex?.(e.charIndex);
    }
  };
  utterance.onend = finishOnce;
  utterance.onerror = () => {
    callbacks.onError?.();
    finishOnce();
  };

  window.speechSynthesis.speak(utterance);

  // Safety fallback timer in case headless or muted browsers stall onend
  const fallbackMs = Math.max(4000, Math.round((text.length * 75) / Math.max(0.5, rate)));
  const safetyTimer = window.setTimeout(() => {
    if (!window.speechSynthesis.speaking) {
      finishOnce();
    }
  }, fallbackMs);

  return () => {
    window.clearTimeout(safetyTimer);
    window.speechSynthesis.cancel();
  };
}

export function startLiveSpeechRecognition(
  language: LanguageCode,
  callbacks: {
    onTranscript: (text: string, isFinal: boolean) => void;
    onError: (reason: string) => void;
    onEnd: () => void;
  }
): (() => void) | null {
  const Ctor = getSpeechRecognitionCtor();
  if (!Ctor) return null;

  const recognition = new Ctor();
  recognition.lang = getBcp47ForLanguage(language);
  recognition.continuous = true;
  recognition.interimResults = true;

  let accumulatedFinal = '';

  recognition.onresult = (event) => {
    let interim = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const res = event.results[i];
      const chunk = res[0]?.transcript ?? '';
      if (res.isFinal) {
        accumulatedFinal = `${accumulatedFinal} ${chunk}`.trim();
      } else {
        interim = `${interim} ${chunk}`.trim();
      }
    }
    const combined = `${accumulatedFinal} ${interim}`.trim();
    callbacks.onTranscript(combined, interim.length === 0 && accumulatedFinal.length > 0);
  };

  recognition.onerror = (event) => {
    if (event.error === 'not-allowed') {
      callbacks.onError('Microphone access was denied. Enable microphone permissions or use typed/oral fallback.');
    } else if (event.error === 'network') {
      callbacks.onError('Browser speech recognition requires network on this device. Your audio clip is still saved offline — use Oral Self-Check or Typed Verification below.');
    } else if (event.error === 'no-speech') {
      callbacks.onError('No speech detected. Speak closer to the microphone and try again.');
    } else {
      callbacks.onError(`Speech capture stopped (${event.error}).`);
    }
  };

  recognition.onend = () => {
    callbacks.onEnd();
  };

  try {
    recognition.start();
    return () => {
      try {
        recognition.stop();
      } catch {
        // ignore
      }
    };
  } catch {
    return null;
  }
}

function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

export function evaluateSpokenTranscript(
  transcript: string,
  expectedKeywords: string[]
): {
  matchedKeywords: string[];
  missedKeywords: string[];
  scorePercent: number;
  passed: boolean;
} {
  const normTranscript = normalizeText(transcript);
  const words = normTranscript.split(' ').filter(Boolean);

  const matchedKeywords: string[] = [];
  const missedKeywords: string[] = [];

  for (const kw of expectedKeywords) {
    const normKw = normalizeText(kw);
    if (!normKw) continue;
    const directHit = normTranscript.includes(normKw);
    const fuzzyHit =
      !directHit &&
      words.some((w) => {
        if (w.length < 3 || normKw.length < 3) return w === normKw;
        const dist = levenshtein(w, normKw);
        return dist <= Math.max(1, Math.floor(normKw.length * 0.3));
      });

    if (directHit || fuzzyHit) {
      matchedKeywords.push(kw);
    } else {
      missedKeywords.push(kw);
    }
  }

  const total = Math.max(1, expectedKeywords.length);
  const scorePercent = Math.round((matchedKeywords.length / total) * 100);
  const passed = scorePercent >= 50 && matchedKeywords.length >= 2;

  return {
    matchedKeywords,
    missedKeywords,
    scorePercent,
    passed,
  };
}
