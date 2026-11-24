import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Download, Check } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [deferredPrompt, setDeferredPrompt] = useState(() => window.__pwaInstallPrompt || null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed PWA)
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches || 
      window.navigator.standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
    }

    const handlePrompt = (e) => {
      e.preventDefault();
      window.__pwaInstallPrompt = e;
      setDeferredPrompt(e);
    };

    const handlePromptReady = () => {
      if (window.__pwaInstallPrompt) {
        setDeferredPrompt(window.__pwaInstallPrompt);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      window.__pwaInstallPrompt = null;
    };

    window.addEventListener('beforeinstallprompt', handlePrompt);
    window.addEventListener('pwa-prompt-ready', handlePromptReady);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handlePrompt);
      window.removeEventListener('pwa-prompt-ready', handlePromptReady);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    const promptEvent = deferredPrompt || window.__pwaInstallPrompt;
    if (promptEvent) {
      promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      if (choice && choice.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      window.__pwaInstallPrompt = null;
    }
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100/90 transition-all">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-2xs group-hover:scale-105 transition-transform">
              AM
            </div>
            <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight group-hover:text-slate-700 transition-colors">
              AppMuseum
            </span>
          </Link>

          {/* Right Navigation & Install Action */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Primary Nav Links */}
            <nav className="flex items-center gap-1 sm:gap-1.5">
              <Link
                to="/"
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive('/') && location.pathname === '/'
                    ? 'bg-slate-100 text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Websites
              </Link>
              <Link
                to="/categories"
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive('/categories')
                    ? 'bg-slate-100 text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Categories
              </Link>
            </nav>

            {/* Install PWA Button */}
            <div className="pl-1 sm:pl-2 border-l border-slate-200/80 shrink-0">
              {isInstalled ? (
                <span 
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 shadow-2xs"
                  title="AppMuseum is installed"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span className="hidden sm:inline">Installed</span>
                </span>
              ) : (
                <button
                  onClick={handleInstallClick}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-all cursor-pointer border border-slate-900 active:scale-95 shadow-xs"
                  title="Install AppMuseum directly to your home screen or desktop"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Install</span>
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
