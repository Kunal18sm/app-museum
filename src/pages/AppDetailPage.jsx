import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, X, ChevronLeft, ChevronRight, Maximize2, GitBranch } from 'lucide-react';
import { useAppMuseum } from '../context/AppContext';
import AppCard from '../components/AppCard';

export default function AppDetailPage() {
  const { id } = useParams();
  const { getAppById, apps } = useAppMuseum();
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const app = getAppById(id);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen || !app?.screenshots?.length) return;
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') {
        setActiveScreenshot((prev) => (prev + 1) % app.screenshots.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveScreenshot((prev) => (prev - 1 + app.screenshots.length) % app.screenshots.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, app]);

  if (!app) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-20 text-center">
        <h2 className="text-base font-semibold text-slate-900">Website Not Found</h2>
        <p className="text-xs text-slate-500 mt-1">This website does not exist in the museum.</p>
        <Link 
          to="/"
          className="inline-flex items-center gap-1.5 mt-4 px-3.5 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-lg"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Home
        </Link>
      </div>
    );
  }

  const {
    name,
    tagline,
    category,
    icon,
    url,
    github,
    description,
    screenshots
  } = app;

  const relatedApps = apps.filter(a => a.category === category && a.id !== id).slice(0, 4);

  const nextImage = (e) => {
    e.stopPropagation();
    if (screenshots && screenshots.length > 0) {
      setActiveScreenshot((prev) => (prev + 1) % screenshots.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (screenshots && screenshots.length > 0) {
      setActiveScreenshot((prev) => (prev - 1 + screenshots.length) % screenshots.length);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Top Breadcrumb */}
      <div className="border-b border-slate-100 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Websites</span>
          </Link>
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {category}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* App Header: Square Icon + Title + Visit Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Square App Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden shrink-0 flex items-center justify-center">
              {icon ? (
                <img 
                  src={icon} 
                  alt={name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="font-bold text-lg sm:text-xl text-slate-700">
                  {name ? name.charAt(0) : 'W'}
                </div>
              )}
            </div>

            {/* Title & Tagline */}
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-slate-900 leading-tight">
                {name}
              </h1>
              {tagline && (
                <p className="text-xs text-slate-500 mt-0.5">
                  {tagline}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full sm:w-auto flex flex-wrap sm:flex-nowrap items-center gap-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>GitHub Repo</span>
              </a>
            )}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <span>Visit Website</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Small clean line directly under the header */}
        <div className="w-full h-[1px] bg-slate-100"></div>

        {/* Description Section */}
        <div className="space-y-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            About this Website
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/70 p-4 sm:p-5 rounded-xl border border-slate-100">
            {description || tagline || 'No extended description provided.'}
          </p>
        </div>

        {/* Screenshots / Preview - FULL 100% UN-CROPPED DISPLAY */}
        {screenshots && screenshots.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Preview ({activeScreenshot + 1}/{screenshots.length})
              </h2>
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Full Screen</span>
              </button>
            </div>

            {/* Main Preview Container - Shows FULL Image with zero crop */}
            <div 
              onClick={() => setIsLightboxOpen(true)}
              className="group relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/90 cursor-zoom-in min-h-[220px] max-h-[520px] sm:max-h-[580px] flex items-center justify-center p-2 sm:p-4 transition-all"
              title="Click to view full image in same tab"
            >
              <img 
                src={screenshots[activeScreenshot] || screenshots[0]} 
                alt={`${name} preview`}
                className="max-h-[480px] sm:max-h-[540px] w-auto max-w-full object-contain mx-auto rounded-lg shadow-xs transition-transform duration-300 group-hover:scale-[1.01]"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
              {/* Subtle hover zoom tag */}
              <div className="absolute bottom-3 right-3 opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="bg-slate-900/80 text-white text-[11px] px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1 shadow-sm">
                  <Maximize2 className="w-3 h-3" />
                  <span>Click to view full</span>
                </span>
              </div>
            </div>

            {/* Thumbnails if multiple */}
            {screenshots.length > 1 && (
              <div className="flex items-center gap-2 pt-1 overflow-x-auto">
                {screenshots.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveScreenshot(idx);
                    }}
                    className={`w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 bg-slate-100 transition-all shrink-0 p-0.5 cursor-pointer flex items-center justify-center ${
                      activeScreenshot === idx ? 'border-slate-900 shadow-xs ring-1 ring-slate-900' : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={s} alt="thumb" className="w-full h-full object-contain rounded" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Website Link Details */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="text-slate-500 shrink-0">Direct Link:</span>
            <a 
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-900 font-medium hover:underline inline-flex items-center gap-1 truncate"
            >
              <span className="truncate">{url}</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
          {github && (
            <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
              <span className="text-slate-500">Repository:</span>
              <a 
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-900 font-medium hover:underline inline-flex items-center gap-1"
              >
                <span>GitHub Source</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </a>
            </div>
          )}
        </div>

        {/* More in this category */}
        {relatedApps.length > 0 && (
          <div className="pt-6 sm:pt-8 border-t border-slate-100 space-y-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              More in {category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {relatedApps.map(relApp => (
                <AppCard key={relApp.id} app={relApp} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL (Same Tab) - 100% UNCROPPED FULL VIEW */}
      {isLightboxOpen && screenshots && screenshots.length > 0 && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-150"
        >
          {/* Lightbox Content Container */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-6xl w-full max-h-[96vh] flex flex-col items-center justify-center"
          >
            {/* Top Bar with Info & Close Button */}
            <div className="w-full flex items-center justify-between text-white pb-2.5 px-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm sm:text-base">{name}</span>
                {screenshots.length > 1 && (
                  <span className="text-xs text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                    {activeScreenshot + 1} / {screenshots.length}
                  </span>
                )}
              </div>

              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Expanded Image - Fully uncropped with object-contain */}
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/60 flex items-center justify-center shadow-2xl p-2 sm:p-4 min-h-[300px]">
              <img 
                src={screenshots[activeScreenshot]} 
                alt={`${name} preview expanded`}
                className="max-h-[80vh] sm:max-h-[82vh] max-w-full w-auto h-auto object-contain mx-auto rounded-lg"
              />

              {/* Prev Button if multiple */}
              {screenshots.length > 1 && (
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-xs transition-colors cursor-pointer border border-white/20 shadow-lg"
                  title="Previous (Left Arrow)"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}

              {/* Next Button if multiple */}
              {screenshots.length > 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-xs transition-colors cursor-pointer border border-white/20 shadow-lg"
                  title="Next (Right Arrow)"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}
            </div>

            {/* Bottom thumbnail selector inside lightbox */}
            {screenshots.length > 1 && (
              <div className="flex items-center gap-2 pt-2.5 overflow-x-auto max-w-full px-2">
                {screenshots.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveScreenshot(idx)}
                    className={`w-14 h-10 sm:w-16 sm:h-11 rounded-lg overflow-hidden border-2 bg-black/40 transition-all p-0.5 cursor-pointer shrink-0 flex items-center justify-center ${
                      activeScreenshot === idx ? 'border-white ring-1 ring-white' : 'border-white/30 opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={s} alt="thumb" className="w-full h-full object-contain rounded" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
