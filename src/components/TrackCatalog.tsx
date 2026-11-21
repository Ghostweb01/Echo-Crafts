import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  Mic,
  WifiOff,
  Globe,
  BookOpen,
  Sprout,
  Smartphone,
  ArrowRight,
  HardDrive,
} from 'lucide-react';
import { ALL_LESSONS, LANGUAGES, SKILL_TRACKS } from '../data/curriculum';
import { LanguageCode, LearnerProgress, OfflinePackState, TrackId } from '../types/curriculum';
import { calculateStreakDays } from '../services/offlineStorage';
import heroPracticalImg from '../assets/images/hero_practical_learning_1795231031057.jpg';

interface TrackCatalogProps {
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  progress: LearnerProgress;
  offlinePacks: OfflinePackState[];
  isOffline: boolean;
  onOpenLesson: (lessonId: string) => void;
  onDownloadPack: (trackId: TrackId) => void;
  onOpenProgress: () => void;
}

export const TrackCatalog: React.FC<TrackCatalogProps> = ({
  language,
  onSelectLanguage,
  progress,
  offlinePacks,
  isOffline,
  onOpenLesson,
  onDownloadPack,
  onOpenProgress,
}) => {
  const [filterTrack, setFilterTrack] = useState<'all' | TrackId>('all');
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [failedTrackImgs, setFailedTrackImgs] = useState<Record<string, boolean>>({});

  const completedCount = progress.completedLessons.length;
  const totalLessons = ALL_LESSONS.length;
  const verifiedCount = new Set(
    progress.verifications.filter((v) => v.passed).map((v) => v.lessonId)
  ).size;
  const streakDays = calculateStreakDays(progress.activeDates);
  const totalCachedKb = offlinePacks.reduce((sum, p) => sum + p.sizeKb, 0);

  const visibleTracks =
    filterTrack === 'all'
      ? SKILL_TRACKS
      : SKILL_TRACKS.filter((t) => t.id === filterTrack);

  const trackIcons: Record<TrackId, React.ReactNode> = {
    bookkeeping: <BookOpen className="w-5 h-5 text-[#047857] dark:text-[#34D399]" />,
    farming: <Sprout className="w-5 h-5 text-[#047857] dark:text-[#34D399]" />,
    digital: <Smartphone className="w-5 h-5 text-[#047857] dark:text-[#34D399]" />,
  };

  return (
    <div className="space-y-10 pb-20 md:pb-12">
      {/* Workspace Toolbar: Local Language Selector + Real Connectivity Context */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-[#E2E7E4] dark:border-[#28342E] pb-5">
        <div className="flex items-center gap-2.5 text-sm text-[#425049] dark:text-[#B5C4BC]">
          <Globe className="w-4 h-4 text-[#047857] dark:text-[#34D399] shrink-0" />
          <span className="font-medium text-[#141A17] dark:text-[#ECF2EE]">Spoken Lesson Language:</span>
          <span className="text-[#5A6760] dark:text-[#8FA398] hidden sm:inline">
            Audio narration, captions & voice verification adapt immediately
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EBF0ED] dark:bg-[#1C2521] rounded-xl" role="group" aria-label="Select local language">
          {LANGUAGES.map((lang) => {
            const active = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => onSelectLanguage(lang.code)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                  active
                    ? 'bg-white dark:bg-[#151C19] text-[#141A17] dark:text-[#ECF2EE] shadow-sm'
                    : 'text-[#4B5851] dark:text-[#9BB0A5] hover:text-[#141A17] dark:hover:text-[#ECF2EE]'
                }`}
              >
                {lang.nativeName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Split: Balanced 2-column grid with items-stretch */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-between bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-6 sm:p-8 lg:p-10">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#4B5851] dark:text-[#9BB0A5]">
              <span>Spoken Practical Curriculum</span>
              <span aria-hidden="true">·</span>
              <span>5 Local Languages</span>
              <span aria-hidden="true">·</span>
              <span>{isOffline ? 'Offline Mode Active' : 'Offline Ready'}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141A17] dark:text-[#ECF2EE] leading-[1.12] text-balance">
              Practical livelihood skills taught by voice, verified out loud.
            </h1>

            <p className="text-base sm:text-lg text-[#425049] dark:text-[#B5C4BC] leading-relaxed max-w-2xl">
              Master daily bookkeeping, moisture-saving farming techniques, and mobile money safety through clear spoken lessons in your language—cached on your device so learning never stops without signal.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E2E7E4] dark:border-[#28342E] flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onOpenLesson(progress.lastOpenedLessonId || 'bk-1')}
              className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3 rounded-xl bg-[#047857] text-white text-sm font-semibold hover:bg-[#065F46] transition-colors whitespace-nowrap shrink-0"
            >
              <Play className="w-4 h-4 fill-current shrink-0" />
              <span>Start Spoken Lesson</span>
            </button>

            <button
              type="button"
              onClick={onOpenProgress}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-xl border border-[#CBD5D0] dark:border-[#324039] bg-white dark:bg-[#1C2521] text-[#141A17] dark:text-[#ECF2EE] text-sm font-medium hover:bg-[#F0F4F2] dark:hover:bg-[#24302A] transition-colors whitespace-nowrap shrink-0"
            >
              <span>View My Progress</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[#E2E7E4] dark:border-[#28342E] bg-[#E5EBE7] dark:bg-[#1C2521] min-h-[260px] lg:min-h-full">
          {!heroImgFailed ? (
            <img
              src={heroPracticalImg}
              alt="Community learning table with open bookkeeping ledger, maize seedlings, and voice lesson phone"
              referrerPolicy="no-referrer"
              onError={() => setHeroImgFailed(true)}
              className="w-full h-full object-cover lg:h-full"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#E7EFEA] dark:bg-[#1C2521]">
              <BookOpen className="w-10 h-10 text-[#047857] dark:text-[#34D399] mb-3" />
              <p className="text-sm font-medium text-[#141A17] dark:text-[#ECF2EE]">Spoken Practical Field Lessons</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-6">
            <p className="text-xs text-white/85 font-medium">
              Voice-to-Text Verification · Local Storage Sync
            </p>
            <p className="mt-1 text-base font-semibold text-white">
              Listen in {LANGUAGES.find((l) => l.code === language)?.nativeName}, practice interactively, then speak back to earn mastery.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Column KPI Strip in full-width row below Hero Split */}
      <section aria-label="Learning Progress Summary" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-5">
          <p className="text-xs font-medium text-[#5A6760] dark:text-[#8FA398]">Lessons Completed</p>
          <p className="mt-2 font-mono text-2xl sm:text-3xl font-semibold text-[#141A17] dark:text-[#ECF2EE] tabular-nums">
            {completedCount} / {totalLessons}
          </p>
          <p className="mt-1 text-xs text-[#425049] dark:text-[#B5C4BC]">Across 3 practical tracks</p>
        </div>

        <div className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-5">
          <p className="text-xs font-medium text-[#5A6760] dark:text-[#8FA398]">Voice Checks Passed</p>
          <p className="mt-2 font-mono text-2xl sm:text-3xl font-semibold text-[#047857] dark:text-[#34D399] tabular-nums">
            {verifiedCount} / {totalLessons}
          </p>
          <p className="mt-1 text-xs text-[#425049] dark:text-[#B5C4BC]">Spoken recall verified</p>
        </div>

        <div className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-5">
          <p className="text-xs font-medium text-[#5A6760] dark:text-[#8FA398]">Active Study Streak</p>
          <p className="mt-2 font-mono text-2xl sm:text-3xl font-semibold text-[#141A17] dark:text-[#ECF2EE] tabular-nums">
            {streakDays} {streakDays === 1 ? 'Day' : 'Days'}
          </p>
          <p className="mt-1 text-xs text-[#425049] dark:text-[#B5C4BC]">Saved locally on device</p>
        </div>

        <div className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-5">
          <p className="text-xs font-medium text-[#5A6760] dark:text-[#8FA398]">Offline Packs Cached</p>
          <p className="mt-2 font-mono text-2xl sm:text-3xl font-semibold text-[#141A17] dark:text-[#ECF2EE] tabular-nums">
            {offlinePacks.length} / {SKILL_TRACKS.length}
          </p>
          <p className="mt-1 text-xs text-[#425049] dark:text-[#B5C4BC] tabular-nums">{totalCachedKb} KB stored offline</p>
        </div>
      </section>

      {/* Skill Tracks Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#141A17] dark:text-[#ECF2EE]">
              Practical Skill Tracks
            </h2>
            <p className="mt-1 text-sm text-[#425049] dark:text-[#B5C4BC]">
              Choose a lesson below to listen in {LANGUAGES.find((l) => l.code === language)?.nativeName}, complete the hands-on exercise, and verify aloud.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#EBF0ED] dark:bg-[#1C2521] rounded-xl self-start sm:self-auto" role="tablist" aria-label="Filter skill tracks">
            {(
              [
                { id: 'all', label: 'All Tracks' },
                { id: 'bookkeeping', label: 'Bookkeeping' },
                { id: 'farming', label: 'Farming' },
                { id: 'digital', label: 'Digital Basics' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={filterTrack === tab.id}
                onClick={() => setFilterTrack(tab.id)}
                className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                  filterTrack === tab.id
                    ? 'bg-white dark:bg-[#151C19] text-[#141A17] dark:text-[#ECF2EE] shadow-sm'
                    : 'text-[#4B5851] dark:text-[#9BB0A5] hover:text-[#141A17] dark:hover:text-[#ECF2EE]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {visibleTracks.map((track) => {
            const isCached = offlinePacks.some((p) => p.trackId === track.id);
            const trackCompleted = track.lessons.filter((l) =>
              progress.completedLessons.includes(l.id)
            ).length;
            const imgFailed = failedTrackImgs[track.id];

            return (
              <article
                key={track.id}
                className="flex flex-col bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl overflow-hidden"
              >
                <div className="relative aspect-[4/3] bg-[#E5EBE7] dark:bg-[#1C2521] overflow-hidden">
                  {!imgFailed ? (
                    <img
                      src={track.imageUrl}
                      alt={track.title[language]}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedTrackImgs((prev) => ({ ...prev, [track.id]: true }))
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#E7EFEA] dark:bg-[#1C2521]">
                      {trackIcons[track.id]}
                      <span className="mt-2 text-sm font-medium text-[#141A17] dark:text-[#ECF2EE]">
                        {track.title[language]}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col p-6">
                  <div className="flex items-center justify-between gap-2 text-xs text-[#5A6760] dark:text-[#8FA398] tabular-nums">
                    <span>
                      {trackCompleted} of {track.lessons.length} lessons completed
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{track.packSizeKb} KB</span>
                  </div>

                  <h3 className="mt-2 font-display text-xl font-bold text-[#141A17] dark:text-[#ECF2EE] leading-snug">
                    {track.title[language]}
                  </h3>

                  <p className="mt-2 text-sm text-[#425049] dark:text-[#B5C4BC] leading-relaxed">
                    {track.subtitle[language]}
                  </p>

                  {/* Hairline list of lessons instead of nested cards */}
                  <div className="mt-5 pt-4 border-t border-[#E2E7E4] dark:border-[#28342E] divide-y divide-[#EFF3F1] dark:divide-[#24302A] flex-1">
                    {track.lessons.map((lesson) => {
                      const done = progress.completedLessons.includes(lesson.id);
                      const verified = progress.verifications.some(
                        (v) => v.lessonId === lesson.id && v.passed
                      );
                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          onClick={() => onOpenLesson(lesson.id)}
                          className="w-full py-3 flex items-center justify-between gap-3 text-left min-h-[48px] group hover:bg-[#F7F9F8] dark:hover:bg-[#1C2521] -mx-2 px-2 rounded-lg transition-colors"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#141A17] dark:text-[#ECF2EE] group-hover:text-[#047857] dark:group-hover:text-[#34D399] transition-colors truncate">
                              0{lesson.order}. {lesson.title[language]}
                            </p>
                            <p className="text-xs text-[#5A6760] dark:text-[#8FA398] mt-0.5 tabular-nums">
                              {lesson.durationMin} min spoken
                              {verified ? ' · Voice verified' : ''}
                            </p>
                          </div>
                          <span className="shrink-0">
                            {done ? (
                              <CheckCircle2 className="w-5 h-5 text-[#047857] dark:text-[#34D399]" aria-label="Completed" />
                            ) : (
                              <Play className="w-4 h-4 text-[#5A6760] dark:text-[#8FA398] group-hover:text-[#047857] dark:group-hover:text-[#34D399]" aria-label="Start lesson" />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E2E7E4] dark:border-[#28342E] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenLesson(track.lessons[0].id)}
                      className="flex-1 min-h-[44px] px-4 py-2 rounded-xl bg-[#141A17] dark:bg-[#ECF2EE] text-white dark:text-[#141A17] text-sm font-semibold hover:bg-[#27312C] dark:hover:bg-[#D5E0DA] transition-colors whitespace-nowrap"
                    >
                      Open Track
                    </button>

                    <button
                      type="button"
                      onClick={() => onDownloadPack(track.id)}
                      disabled={isCached}
                      className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
                        isCached
                          ? 'border border-[#D1DDD7] dark:border-[#24473A] bg-[#F2F7F4] dark:bg-[#132A21] text-[#047857] dark:text-[#34D399] cursor-default'
                          : 'border border-[#CBD5D0] dark:border-[#324039] bg-white dark:bg-[#1C2521] text-[#141A17] dark:text-[#ECF2EE] hover:bg-[#F0F4F2] dark:hover:bg-[#24302A]'
                      }`}
                    >
                      {isCached ? (
                        <>
                          <WifiOff className="w-3.5 h-3.5 shrink-0" />
                          <span>Saved Offline</span>
                        </>
                      ) : (
                        <>
                          <HardDrive className="w-3.5 h-3.5 shrink-0" />
                          <span>Cache Pack</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
