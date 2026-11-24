import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppMuseum } from '../context/AppContext';
import AppCard from '../components/AppCard';

export default function CategoriesPage() {
  const { apps, categoriesList, setSelectedCategory } = useAppMuseum();
  const navigate = useNavigate();

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    navigate('/');
  };

  const pureCategories = categoriesList.filter(c => c !== 'All');

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <section className="border-b border-slate-100 py-6 sm:py-10 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl sm:text-3xl font-bold text-slate-900">
            Categories
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Browse web applications by category.
          </p>
        </div>
      </section>

      {/* Main categories list */}
      <main className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {pureCategories.map(cat => {
          const catApps = apps.filter(a => a.category === cat);
          if (catApps.length === 0) return null;

          return (
            <section key={cat} className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h2 className="text-xs sm:text-sm font-semibold text-slate-900">{cat}</h2>
                <button
                  onClick={() => handleSelectCategory(cat)}
                  className="text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  View all ({catApps.length}) →
                </button>
              </div>

              {/* 2 cards per row on mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {catApps.map(app => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </section>
          );
        })}
      </main>

    </div>
  );
}
