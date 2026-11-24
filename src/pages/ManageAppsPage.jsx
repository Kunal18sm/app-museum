import React, { useState } from 'react';
import { Copy, Check, RotateCcw, Plus, ArrowUpRight } from 'lucide-react';
import { useAppMuseum } from '../context/AppContext';

export default function ManageAppsPage({ onOpenAddModal }) {
  const { apps, resetToDefaultApps } = useAppMuseum();
  const [copied, setCopied] = useState(false);

  const fullJsonString = JSON.stringify(apps, null, 2);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(fullJsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <section className="border-b border-slate-100 py-10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Websites Data Manager
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Yahan se aap apne saare websites dekh sakte hain, naye add kar sakte hain, ya unka JSON code copy kar sakte hain.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Actions bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-xs font-semibold text-slate-900">
            Total Websites: {apps.length}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Website</span>
            </button>

            <button
              onClick={handleCopyJson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-md cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'JSON Copied!' : 'Copy JSON'}</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Reset to initial sample websites?')) {
                  resetToDefaultApps();
                }
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 rounded-md"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Websites Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
              <tr>
                <th className="py-2.5 px-4">Icon</th>
                <th className="py-2.5 px-4">Name</th>
                <th className="py-2.5 px-4">Category</th>
                <th className="py-2.5 px-4">URL</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {apps.map(app => (
                <tr key={app.id} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-4">
                    <div className="w-8 h-8 rounded-md border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center">
                      {app.icon ? (
                        <img src={app.icon} alt={app.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-bold text-slate-700">{app.name.charAt(0)}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-2.5 px-4 font-medium text-slate-900">
                    {app.name}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">
                    {app.category}
                  </td>
                  <td className="py-2.5 px-4">
                    <a 
                      href={app.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-700 hover:underline max-w-[200px] truncate inline-block"
                    >
                      {app.url}
                    </a>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-900 font-medium inline-flex items-center gap-1 hover:underline"
                    >
                      <span>Visit</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>

    </div>
  );
}
