import { X, Download, Smartphone } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';
import { useState } from 'react';

export function PWAInstallPrompt() {
  const { isInstallable, installApp } = usePWA();
  const [isDismissed, setIsDismissed] = useState(
    localStorage.getItem('pwa_prompt_dismissed') === 'true'
  );

  if (!isInstallable || isDismissed) return null;

  const handleInstall = () => {
    installApp();
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-2xl border border-blue-500 z-50 animate-slide-up">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Install Pharmacore</h3>
              <p className="text-blue-100 text-sm">Get the native app experience</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-blue-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <ul className="space-y-2 mb-4 text-sm text-blue-50">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
            Works offline for uninterrupted POS
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
            Faster loading and better performance
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
            Install on your home screen
          </li>
        </ul>

        <button
          onClick={handleInstall}
          className="w-full bg-white text-blue-600 px-4 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center justify-center gap-2 active:scale-98"
        >
          <Download className="w-5 h-5" />
          Install Now
        </button>
      </div>
    </div>
  );
}