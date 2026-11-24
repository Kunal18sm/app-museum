import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
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

          {/* Clean Nav links without Add button */}
          <nav className="flex items-center gap-1.5 sm:gap-2">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Websites
            </Link>
            <Link
              to="/categories"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive('/categories')
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Categories
            </Link>
            <Link
              to="/manage"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive('/manage')
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Data
            </Link>
          </nav>

        </div>
      </div>
    </header>
  );
}
