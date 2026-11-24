import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AddAppModal from './components/AddAppModal';

// Pages
import HomePage from './pages/HomePage';
import AppDetailPage from './pages/AppDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import ManageAppsPage from './pages/ManageAppsPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
          
          {/* Navigation Bar */}
          <Navbar onOpenAddModal={() => setIsAddModalOpen(true)} />

          {/* Main Route Content */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage onOpenAddModal={() => setIsAddModalOpen(true)} />} />
              <Route path="/app/:id" element={<AppDetailPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/manage" element={<ManageAppsPage onOpenAddModal={() => setIsAddModalOpen(true)} />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />

          {/* Add Website Modal */}
          <AddAppModal 
            isOpen={isAddModalOpen} 
            onClose={() => setIsAddModalOpen(false)} 
          />

        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
