import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function AppCard({ app }) {
  const { id, name, tagline, icon, url, category } = app;
  const navigate = useNavigate();

  const handleVisit = (e) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      onClick={() => navigate(`/app/${id}`)}
      className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-slate-300 hover:shadow-sm transition-all flex flex-col p-2.5 sm:p-3.5 cursor-pointer relative"
    >
      
      {/* Square Image / App Artwork at top */}
      <div className="w-full aspect-square rounded-xl sm:rounded-2xl border border-slate-100 bg-slate-50 overflow-hidden flex items-center justify-center relative">
        {icon ? (
          <img 
            src={icon} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-bold text-2xl text-slate-600 bg-slate-100">
            {name ? name.charAt(0) : 'W'}
          </div>
        )}

        {/* Quick Visit overlay button on top right of square icon */}
        <button
          onClick={handleVisit}
          className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/95 backdrop-blur-xs text-slate-800 hover:bg-slate-900 hover:text-white flex items-center justify-center shadow-xs border border-slate-200/80 transition-all cursor-pointer opacity-90 group-hover:opacity-100 active:scale-95"
          title={`Visit ${name} (${url})`}
        >
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* Small clean line directly under the square icon */}
      <div className="w-full h-[1px] bg-slate-100 my-2.5 sm:my-3"></div>

      {/* Title & Tagline centered below the image */}
      <div className="text-center px-1 pb-1 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-semibold text-xs sm:text-sm text-slate-900 line-clamp-1 group-hover:text-slate-700 transition-colors">
            {name}
          </h3>
          {tagline && (
            <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-2 mt-0.5 leading-snug">
              {tagline}
            </p>
          )}
        </div>

        {/* Visit link at bottom */}
        <div className="mt-2 pt-2 border-t border-slate-50 flex items-center justify-between text-[10px] sm:text-xs text-slate-400">
          <span className="truncate max-w-[65px] sm:max-w-[80px]">{category}</span>
          <button
            onClick={handleVisit}
            className="text-slate-700 hover:text-slate-950 font-medium inline-flex items-center gap-0.5"
          >
            <span>Visit</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>

    </div>
  );
}
