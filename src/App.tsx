import { useEffect, useState } from 'react';
import { WifiOff, Sun, Moon } from 'lucide-react';
import { registerSW } from 'virtual:pwa-register';
import { Header, AppView } from './components/Header';
import { TrackCatalog } from './components/TrackCatalog';
import { LessonStudio } from './components/LessonStudio';
import { ProgressDashboard } from './components/ProgressDashboard';
import { OfflineManager } from './components/OfflineManager';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import {
  DEFAULT_PROGRESS,
  downloadTrackPack,
  loadOfflinePacks,
  loadProgress,
  removeTrackPack,
  resetAllProgress,
  saveProgress,
} from './services/offlineStorage';
import {
  LanguageCode,
  LearnerProgress,
  OfflinePackState,
  TrackId,
  VoiceVerificationRecord,
} from './types/curriculum';

export default function App() {
  const isDeviceOnline = useOnlineStatus();
  const [simulatedOffline, setSimulatedOffline] = useState(false);
  const [activeView, setActiveView] = useState<AppView>('tracks');
  const [activeLessonId, setActiveLessonId] = useState('bk-1');
  const [progress, setProgress] = useState<LearnerProgress>(DEFAULT_PROGRESS);
  const [offlinePacks, setOfflinePacks] = useState<OfflinePackState[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('echocraft_theme') === 'dark' ? 'dark' : 'light';
  });

  const isOffline = !isDeviceOnline || simulatedOffline;

  useEffect(() => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem('echocraft_theme', theme);
    } catch {
      // ignore
    }
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', isDark ? '#0D1210' : '#047857');
    }
  }, [theme]);

  useEffect(() => {
    registerSW({ immediate: true });

    Promise.all([loadProgress(), loadOfflinePacks()]).then(([loadedProgress, loadedPacks]) => {
      setProgress(loadedProgress);
      setActiveLessonId(loadedProgress.lastOpenedLessonId || 'bk-1');
      setOfflinePacks(loadedPacks);
      setHydrated(true);
    });
  }, []);

  const updateAndPersistProgress = (updater: (prev: LearnerProgress) => LearnerProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      saveProgress(next);
      return next;
    });
  };

  const handleSelectLanguage = (lang: LanguageCode) => {
    updateAndPersistProgress((prev) => ({
      ...prev,
      preferredLanguage: lang,
    }));
  };

  const handleChangeSpeechRate = (rate: number) => {
    updateAndPersistProgress((prev) => ({
      ...prev,
      speechRate: rate,
    }));
  };

  const handleOpenLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setActiveView('studio');
    updateAndPersistProgress((prev) => ({
      ...prev,
      lastOpenedLessonId: lessonId,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompletePractice = (lessonId: string) => {
    updateAndPersistProgress((prev) => {
      const completedPractices = prev.completedPractices.includes(lessonId)
        ? prev.completedPractices
        : [...prev.completedPractices, lessonId];
      const hasPassedVoice = prev.verifications.some(
        (v) => v.lessonId === lessonId && v.passed
      );
      const completedLessons =
        hasPassedVoice && !prev.completedLessons.includes(lessonId)
          ? [...prev.completedLessons, lessonId]
          : prev.completedLessons;

      return {
        ...prev,
        completedPractices,
        completedLessons,
      };
    });
  };

  const handleRecordVerification = (record: VoiceVerificationRecord) => {
    updateAndPersistProgress((prev) => {
      const verifications = [record, ...prev.verifications];
      const completedLessons =
        record.passed && !prev.completedLessons.includes(record.lessonId)
          ? [...prev.completedLessons, record.lessonId]
          : prev.completedLessons;

      return {
        ...prev,
        verifications,
        completedLessons,
      };
    });
  };

  const handleDownloadPack = async (trackId: TrackId) => {
    const next = await downloadTrackPack(trackId);
    setOfflinePacks(next);
  };

  const handleRemovePack = async (trackId: TrackId) => {
    const next = await removeTrackPack(trackId);
    setOfflinePacks(next);
  };

  const handleResetProgress = async () => {
    const fresh = await resetAllProgress();
    setProgress(fresh);
    setActiveLessonId(fresh.lastOpenedLessonId);
  };

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-[#F7F8F7] dark:bg-[#0D1210] flex items-center justify-center p-6">
        <p className="text-sm font-medium text-[#425049] dark:text-[#B5C4BC]">Loading offline curriculum...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8F7] dark:bg-[#0D1210] text-[#141A17] dark:text-[#ECF2EE] flex flex-col transition-colors">
      <Header
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onResumeLesson={() => handleOpenLesson(progress.lastOpenedLessonId || 'bk-1')}
        language={progress.preferredLanguage}
        hasStarted={progress.completedLessons.length > 0 || progress.verifications.length > 0}
      />

      {isOffline && (
        <div className="bg-[#FEF3C7] dark:bg-[#451A03] border-b border-[#FDE68A] dark:border-[#78350F] text-[#92400E] dark:text-[#FDE68A] px-4 py-2 text-xs font-medium">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2">
              <WifiOff className="w-3.5 h-3.5 shrink-0" />
              <span>
                Offline Mode — Lessons, audio controls, and local progress tracking continue working without signal.
              </span>
            </span>
            {simulatedOffline && (
              <button
                type="button"
                onClick={() => setSimulatedOffline(false)}
                className="underline font-semibold whitespace-nowrap shrink-0"
              >
                Reconnect
              </button>
            )}
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6">
        {/* Workspace Appearance Bar */}
        <div className="flex items-center justify-end mb-4">
          <div
            className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#EBF0ED] dark:bg-[#1C2521]"
            role="group"
            aria-label="Background theme"
          >
            <button
              type="button"
              onClick={() => setTheme('light')}
              aria-pressed={theme === 'light'}
              className={`min-h-[34px] px-3 py-1 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
                theme === 'light'
                  ? 'bg-white text-[#141A17] shadow-sm'
                  : 'text-[#4B5851] dark:text-[#9BB0A5] hover:text-[#141A17] dark:hover:text-[#ECF2EE]'
              }`}
            >
              <Sun className="w-3.5 h-3.5 shrink-0" />
              <span>Light</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              aria-pressed={theme === 'dark'}
              className={`min-h-[34px] px-3 py-1 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
                theme === 'dark'
                  ? 'bg-[#151C19] text-[#ECF2EE] shadow-sm'
                  : 'text-[#4B5851] dark:text-[#9BB0A5] hover:text-[#141A17] dark:hover:text-[#ECF2EE]'
              }`}
            >
              <Moon className="w-3.5 h-3.5 shrink-0" />
              <span>Dark</span>
            </button>
          </div>
        </div>
        {activeView === 'tracks' && (
          <TrackCatalog
            language={progress.preferredLanguage}
            onSelectLanguage={handleSelectLanguage}
            progress={progress}
            offlinePacks={offlinePacks}
            isOffline={isOffline}
            onOpenLesson={handleOpenLesson}
            onDownloadPack={handleDownloadPack}
            onOpenProgress={() => setActiveView('progress')}
          />
        )}

        {activeView === 'studio' && (
          <LessonStudio
            lessonId={activeLessonId}
            language={progress.preferredLanguage}
            progress={progress}
            isOffline={isOffline}
            onSelectLanguage={handleSelectLanguage}
            onChangeSpeechRate={handleChangeSpeechRate}
            onSelectLesson={handleOpenLesson}
            onCompletePractice={handleCompletePractice}
            onRecordVerification={handleRecordVerification}
            onBackToTracks={() => setActiveView('tracks')}
          />
        )}

        {activeView === 'progress' && (
          <ProgressDashboard
            language={progress.preferredLanguage}
            progress={progress}
            onOpenLesson={handleOpenLesson}
            onResetProgress={handleResetProgress}
          />
        )}

        {activeView === 'offline' && (
          <OfflineManager
            language={progress.preferredLanguage}
            offlinePacks={offlinePacks}
            isDeviceOnline={isDeviceOnline}
            simulatedOffline={simulatedOffline}
            onToggleSimulatedOffline={() => setSimulatedOffline((v) => !v)}
            onDownloadPack={handleDownloadPack}
            onRemovePack={handleRemovePack}
          />
        )}
      </main>

      <footer className="hidden md:block border-t border-[#E2E7E4] dark:border-[#28342E] bg-white/60 dark:bg-[#151C19]/80 mt-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between text-xs text-[#5A6760] dark:text-[#8FA398]">
          <span>EchoCraft · Spoken Practical Skills Curriculum</span>
          <span>Offline IndexedDB Storage · 5 Local Languages</span>
        </div>
      </footer>
    </div>
  );
}
