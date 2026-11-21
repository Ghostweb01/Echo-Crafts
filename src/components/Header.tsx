import React from 'react';
import { BookOpen, Headphones, BarChart3, HardDriveDownload } from 'lucide-react';
import { LanguageCode } from '../types/curriculum';
import { UI_LABELS } from '../data/curriculum';

export type AppView = 'tracks' | 'studio' | 'progress' | 'offline';

interface HeaderProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  onResumeLesson: () => void;
  language: LanguageCode;
  hasStarted: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  onResumeLesson,
  language,
  hasStarted,
}) => {
  const navItems: { id: AppView; label: string; icon: React.ReactNode }[] = [
    { id: 'tracks', label: UI_LABELS.tracksNav[language], icon: <BookOpen className="w-5 h-5" /> },
    { id: 'studio', label: UI_LABELS.studioNav[language], icon: <Headphones className="w-5 h-5" /> },
    { id: 'progress', label: UI_LABELS.progressNav[language], icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'offline', label: UI_LABELS.offlineNav[language], icon: <HardDriveDownload className="w-5 h-5" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#F7F8F7]/95 dark:bg-[#0D1210]/95 backdrop-blur-md border-b border-[#E2E7E4] dark:border-[#28342E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between gap-8">
          <a
            href="#tracks"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('tracks');
            }}
            className="font-display text-xl font-bold tracking-tight text-[#141A17] dark:text-[#ECF2EE] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#047857]"
          >
            EchoCraft
          </a>

          <nav className="hidden md:flex items-center gap-7" aria-label="Primary">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#047857] ${
                    isActive
                      ? 'text-[#047857] dark:text-[#34D399]'
                      : 'text-[#4B5851] dark:text-[#9BB0A5] hover:text-[#141A17] dark:hover:text-[#ECF2EE]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-[1px] h-0.5 bg-[#047857] dark:bg-[#34D399]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="shrink-0">
            <button
              type="button"
              onClick={onResumeLesson}
              className="min-h-[40px] md:min-h-[44px] px-4 md:px-5 py-2 rounded-xl bg-[#047857] text-white text-sm font-semibold hover:bg-[#065F46] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#047857]"
            >
              {hasStarted ? 'Resume Lesson' : 'Start Learning'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile bottom tab bar keeping total sticky height compact */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#151C19]/95 backdrop-blur-md border-t border-[#E2E7E4] dark:border-[#28342E]"
      >
        <div className="grid grid-cols-4 h-14">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center min-h-[44px] px-1 transition-colors ${
                  isActive
                    ? 'text-[#047857] dark:text-[#34D399]'
                    : 'text-[#5A6760] dark:text-[#8FA398]'
                }`}
              >
                {item.icon}
                <span className="text-[11px] font-medium mt-0.5 truncate max-w-[78px]">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
