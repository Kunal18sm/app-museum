import React, { useMemo } from 'react';
import { Search, RotateCcw, Plus, Globe } from 'lucide-react';
import { useAppMuseum } from '../context/AppContext';
import AppCard from '../components/AppCard';

export default function HomePage({ onOpenAddModal }) {
  const { 
    apps, 
    categoriesList, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory
  } = useAppMuseum();

  // Filter apps by category and search
  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      const matchesSearch = 
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.category?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [apps, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      
      {/* Centered Header */}
      <section className="border-b border-slate-100 py-8 sm:py-12 text-center bg-white px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900">
            AppMuseum
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            A minimalist showcase for web apps and online projects.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Search & Category Filter - FULLY CENTERED */}
        <div className="space-y-4 max-w-2xl mx-auto text-center">
          
          {/* Centered Search Box */}
          <div className="relative w-full max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search websites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-slate-800 transition-colors shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Centered Category Chips */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none px-1">
            {categoriesList.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Count Header */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
          <span className="font-medium">{filteredApps.length} {filteredApps.length === 1 ? 'website' : 'websites'}</span>

          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        {/* App Cards Grid - 2 on Mobile (grid-cols-2), 3 on Tablet, 4 on Desktop */}
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-5">
            {filteredApps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : apps.length === 0 ? (
          /* Empty state when no apps are added yet */
          <div className="bg-slate-50/70 rounded-2xl border border-dashed border-slate-200 p-8 sm:p-12 text-center my-6">
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-3 text-slate-700">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">
              No websites added yet
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Start building your showcase! Click below to add your websites.
            </p>
            <button
              onClick={onOpenAddModal}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Your First Website</span>
            </button>
          </div>
        ) : (
          /* Empty search match */
          <div className="bg-slate-50 rounded-xl border border-dashed border-slate-200 p-8 text-center my-6">
            <p className="text-xs text-slate-500">No websites found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 px-3 py-1.5 text-xs text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer"
            >
              Show all websites
            </button>
          </div>
        )}

      </main>

    </div>
  );
}
