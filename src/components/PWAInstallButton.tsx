import React, { useState } from 'react';
import { Download, CheckCircle2, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'primary' | 'secondary';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'primary' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  if (isInstalled) {
    return (
      <div className="inline-flex items-center gap-2 text-sm font-medium text-[#047857] dark:text-[#34D399]">
        <CheckCircle2 className="w-4 h-4 shrink-0" />
        <span>Installed on Device</span>
      </div>
    );
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={
          variant === 'primary'
            ? 'inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-[#047857] text-white text-sm font-semibold hover:bg-[#065F46] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#047857]'
            : 'inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl border border-[#CBD5D0] dark:border-[#324039] bg-white dark:bg-[#151C19] text-[#141A17] dark:text-[#ECF2EE] text-sm font-medium hover:bg-[#F0F4F2] dark:hover:bg-[#1C2521] transition-colors whitespace-nowrap shrink-0'
        }
      >
        <Download className="w-4 h-4 shrink-0" />
        <span>Install Offline App</span>
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowGuide(true)}
        className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl border border-[#CBD5D0] dark:border-[#324039] bg-white dark:bg-[#151C19] text-[#141A17] dark:text-[#ECF2EE] text-sm font-medium hover:bg-[#F0F4F2] dark:hover:bg-[#1C2521] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#047857]"
      >
        <Smartphone className="w-4 h-4 shrink-0 text-[#047857] dark:text-[#34D399]" />
        <span>{isIOS ? 'Install on iPhone / iPad' : 'How to Install Offline'}</span>
      </button>

      {showGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="install-guide-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#E2E7E4] dark:border-[#28342E] bg-white dark:bg-[#151C19] p-6 shadow-xl">
            <h3 id="install-guide-title" className="text-xl font-semibold text-[#141A17] dark:text-[#ECF2EE]">
              Install EchoCraft for Offline Use
            </h3>
            {isIOS ? (
              <ol className="mt-4 space-y-2 text-sm text-[#425049] dark:text-[#B5C4BC] list-decimal list-inside leading-relaxed">
                <li>Tap the <strong>Share</strong> icon in the Safari toolbar.</li>
                <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
                <li>Launch EchoCraft from your home screen with zero signal.</li>
              </ol>
            ) : (
              <ol className="mt-4 space-y-2 text-sm text-[#425049] dark:text-[#B5C4BC] list-decimal list-inside leading-relaxed">
                <li>Open your browser menu (three dots or address bar install icon).</li>
                <li>Select <strong>Install App</strong> or <strong>Add to Home screen</strong>.</li>
                <li>Downloaded lesson packs stay available in local device storage.</li>
              </ol>
            )}
            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="mt-6 w-full min-h-[44px] rounded-xl bg-[#141A17] dark:bg-[#ECF2EE] text-white dark:text-[#141A17] text-sm font-semibold hover:bg-[#27312C] dark:hover:bg-[#D5E0DA] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
