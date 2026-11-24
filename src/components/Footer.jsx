import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white mt-auto py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">AppMuseum</span>
          <span>— Websites Showcase</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <Link to="/" className="hover:text-slate-900">Home</Link>
          <Link to="/categories" className="hover:text-slate-900">Categories</Link>
          <Link to="/manage" className="hover:text-slate-900">Data Manager</Link>
        </div>
      </div>
    </footer>
  );
}
