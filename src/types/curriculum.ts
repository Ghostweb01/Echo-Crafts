export type LanguageCode = 'en' | 'sw' | 'yo' | 'es' | 'hi';

export interface LanguageMeta {
  code: LanguageCode;
  name: string;
  nativeName: string;
  bcp47: string;
  regionLabel: string;
}

export type TrackId = 'bookkeeping' | 'farming' | 'digital';

export interface LocalizedSegment {
  spokenText: string;
  phoneticGuide: string;
  keyTakeaway: string;
}

export interface LessonSegment {
  id: string;
  durationSec: number;
  title: Record<LanguageCode, string>;
  content: Record<LanguageCode, LocalizedSegment>;
}

export type PracticeKind =
  | 'bookkeeping-split'
  | 'bookkeeping-ledger'
  | 'bookkeeping-profit'
  | 'farming-zai'
  | 'farming-compost'
  | 'farming-companion'
  | 'digital-scam'
  | 'digital-receipt'
  | 'digital-datasaver';

export interface VoiceChallenge {
  prompt: Record<LanguageCode, string>;
  expectedPhrase: Record<LanguageCode, string>;
  phoneticHint: Record<LanguageCode, string>;
  keywords: Record<LanguageCode, string[]>;
}

export interface Lesson {
  id: string;
  trackId: TrackId;
  order: number;
  durationMin: number;
  title: Record<LanguageCode, string>;
  summary: Record<LanguageCode, string>;
  practiceKind: PracticeKind;
  segments: LessonSegment[];
  voiceChallenge: VoiceChallenge;
}

export interface SkillTrack {
  id: TrackId;
  title: Record<LanguageCode, string>;
  subtitle: Record<LanguageCode, string>;
  imageUrl: string;
  packSizeKb: number;
  lessons: Lesson[];
}

export interface VoiceVerificationRecord {
  id: string;
  lessonId: string;
  trackId: TrackId;
  language: LanguageCode;
  transcript: string;
  matchedKeywords: string[];
  missedKeywords: string[];
  scorePercent: number;
  passed: boolean;
  mode: 'speech-recognition' | 'oral-recording' | 'typed-fallback';
  createdAt: string;
  audioBlobKey?: string;
}

export interface OfflinePackState {
  trackId: TrackId;
  downloadedAt: string;
  sizeKb: number;
  lessonCount: number;
}

export interface LearnerProgress {
  preferredLanguage: LanguageCode;
  speechRate: number;
  completedLessons: string[];
  completedPractices: string[];
  verifications: VoiceVerificationRecord[];
  activeDates: string[];
  lastOpenedLessonId: string;
}
