import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Download, Check, X, Smartphone, Laptop, Share2 } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed PWA)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (isStandalone) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      // Prevent the default browser mini-infobar
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowModal(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error('Install prompt error:', err);
        setShowModal(true);
      }
    } else {
      // If native prompt is not available (Safari, iOS, or manual desktop browser), show guidance modal
      setShowModal(true);
    }
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs sm:text-sm">
                AM
              </div>
              <span className="font-semibold text-slate-900 text-sm sm:text-base tracking-tight">
                AppMuseum
              </span>
            </Link>

            {/* Nav links & Install Action */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              <nav className="flex items-center gap-1 sm:gap-2">
                <Link
                  to="/"
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive('/') && location.pathname === '/'
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Websites
                </Link>
                <Link
                  to="/categories"
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive('/categories')
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Categories
                </Link>
                <Link
                  to="/manage"
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive('/manage')
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Data
                </Link>
              </nav>

              {/* Install PWA Button / Indicator */}
              <div className="pl-1 border-l border-slate-200">
                {isInstalled ? (
                  <span 
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200"
                    title="App is installed and running in standalone mode"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Installed</span>
                  </span>
                ) : (
                  <button
                    onClick={handleInstallClick}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-900 hover:text-white transition-all cursor-pointer border border-slate-200 active:scale-95 shadow-2xs"
                    title="Install AppMuseum as a PWA app"
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

      {/* Install Guidance Modal (for browsers where native deferredPrompt is manual or unavailable like iOS/Desktop Safari) */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                  AM
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Install AppMuseum</h3>
                  <p className="text-xs text-slate-500">Fast, standalone web app on your home screen</p>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 pt-2 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Chrome / Edge / Brave (Desktop)</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Click the <strong>Install</strong> icon on the right side of the URL address bar, or click browser menu (<strong>⋮</strong>) &rarr; <strong>Install AppMuseum</strong>.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Android (Chrome)</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Tap the <strong>three dots menu (⋮)</strong> at top-right &rarr; Tap <strong>Install app</strong> or <strong>Add to Home screen</strong>.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">iPhone / iPad (Safari)</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Tap the <strong>Share button</strong> at bottom &rarr; Scroll down and tap <strong>Add to Home Screen</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
