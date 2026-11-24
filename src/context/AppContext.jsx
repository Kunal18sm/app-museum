import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialApps, categoriesList } from '../data/appsData';

const AppContext = createContext();
const STORAGE_KEY = 'appmuseum_user_apps_v13';

export const AppProvider = ({ children }) => {
  const [apps, setApps] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved !== null ? JSON.parse(saved) : initialApps;
    } catch {
      return initialApps;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  }, [apps]);

  const addApp = (newAppData) => {
    const slug = newAppData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
      
    const completeApp = {
      id: slug || `app-${Date.now()}`,
      ...newAppData,
    };

    setApps(prev => [completeApp, ...prev]);
    return completeApp.id;
  };

  const deleteApp = (id) => {
    setApps(prev => prev.filter(app => app.id !== id));
  };

  const resetToDefaultApps = () => {
    setApps(initialApps);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialApps));
  };

  const getAppById = (id) => {
    return apps.find(a => a.id === id);
  };

  return (
    <AppContext.Provider value={{
      apps,
      categoriesList,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      addApp,
      deleteApp,
      resetToDefaultApps,
      getAppById
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppMuseum = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppMuseum must be used within an AppProvider');
  }
  return context;
};
