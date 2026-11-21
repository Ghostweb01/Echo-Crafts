import React from 'react';
import { HardDrive, Trash2, Wifi, WifiOff, CheckCircle2, Download } from 'lucide-react';
import { SKILL_TRACKS } from '../data/curriculum';
import { LanguageCode, OfflinePackState, TrackId } from '../types/curriculum';
import { PWAInstallButton } from './PWAInstallButton';

interface OfflineManagerProps {
  language: LanguageCode;
  offlinePacks: OfflinePackState[];
  isDeviceOnline: boolean;
  simulatedOffline: boolean;
  onToggleSimulatedOffline: () => void;
  onDownloadPack: (trackId: TrackId) => void;
  onRemovePack: (trackId: TrackId) => void;
}

export const OfflineManager: React.FC<OfflineManagerProps> = ({
  language,
  offlinePacks,
  isDeviceOnline,
  simulatedOffline,
  onToggleSimulatedOffline,
  onDownloadPack,
  onRemovePack,
}) => {
  const totalCachedKb = offlinePacks.reduce((acc, p) => acc + p.sizeKb, 0);
  const effectiveOffline = !isDeviceOnline || simulatedOffline;

  return (
    <div className="space-y-8 pb-20 md:pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E2E7E4] dark:border-[#28342E] pb-5">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#141A17] dark:text-[#ECF2EE]">
            Offline Packs & App Installation
          </h1>
          <p className="mt-1 text-sm text-[#425049] dark:text-[#B5C4BC]">
            Save lesson tracks, illustrations, and local voice guides onto your device for zero-signal study.
          </p>
        </div>

        <PWAInstallButton variant="primary" />
      </div>

      {/* Connectivity & Offline Resilience Control */}
      <section className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#EFF3F1] dark:bg-[#1C2521] flex items-center justify-center shrink-0">
            {effectiveOffline ? (
              <WifiOff className="w-5 h-5 text-[#B45309] dark:text-[#FBBF24]" />
            ) : (
              <Wifi className="w-5 h-5 text-[#047857] dark:text-[#34D399]" />
            )}
          </div>
          <div>
            <h2 className="text-base font-bold text-[#141A17] dark:text-[#ECF2EE]">
              {effectiveOffline
                ? 'Offline Mode Active — Running from Local Cache'
                : 'Device Online — Service Worker Pre-caching Active'}
            </h2>
            <p className="text-sm text-[#425049] dark:text-[#B5C4BC] mt-0.5 tabular-nums">
              {offlinePacks.length} of {SKILL_TRACKS.length} skill packs cached ({totalCachedKb} KB in IndexedDB & Cache Storage).
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleSimulatedOffline}
          className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors ${
            simulatedOffline
              ? 'bg-[#B45309] text-white hover:bg-[#92400E]'
              : 'border border-[#CBD5D0] dark:border-[#324039] bg-white dark:bg-[#1C2521] text-[#141A17] dark:text-[#ECF2EE] hover:bg-[#F0F4F2] dark:hover:bg-[#24302A]'
          }`}
        >
          {simulatedOffline ? 'Exit Offline Test Mode' : 'Test Offline Mode'}
        </button>
      </section>

      {/* Track Offline Pack List */}
      <section className="bg-white dark:bg-[#151C19] border border-[#E2E7E4] dark:border-[#28342E] rounded-2xl divide-y divide-[#EFF3F1] dark:divide-[#24302A]">
        {SKILL_TRACKS.map((track) => {
          const cached = offlinePacks.find((p) => p.trackId === track.id);
          return (
            <div
              key={track.id}
              className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-[#5A6760] dark:text-[#8FA398] tabular-nums">
                  <HardDrive className="w-3.5 h-3.5 text-[#047857] dark:text-[#34D399]" />
                  <span>{track.lessons.length} spoken lessons</span>
                  <span aria-hidden="true">·</span>
                  <span>{track.packSizeKb} KB</span>
                  {cached && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#047857] dark:text-[#34D399] font-semibold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Cached {new Date(cached.downloadedAt).toLocaleDateString()}</span>
                      </span>
                    </>
                  )}
                </div>

                <h3 className="font-display text-lg font-bold text-[#141A17] dark:text-[#ECF2EE]">
                  {track.title[language]}
                </h3>
                <p className="text-sm text-[#425049] dark:text-[#B5C4BC] max-w-2xl">
                  {track.subtitle[language]}
                </p>
              </div>

              <div className="shrink-0">
                {cached ? (
                  <button
                    type="button"
                    onClick={() => onRemovePack(track.id)}
                    className="min-h-[44px] px-4 py-2 rounded-xl border border-[#CBD5D0] dark:border-[#324039] bg-white dark:bg-[#1C2521] text-xs sm:text-sm font-medium text-[#5A6760] dark:text-[#B5C4BC] hover:text-[#141A17] dark:hover:text-[#ECF2EE] inline-flex items-center gap-2 whitespace-nowrap"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove Offline Pack</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onDownloadPack(track.id)}
                    className="min-h-[44px] px-5 py-2 rounded-xl bg-[#047857] text-white text-xs sm:text-sm font-semibold hover:bg-[#065F46] inline-flex items-center gap-2 whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" />
                    <span>Save for Offline ({track.packSizeKb} KB)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
