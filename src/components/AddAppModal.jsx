import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAppMuseum } from '../context/AppContext';

export default function AddAppModal({ isOpen, onClose }) {
  const { addApp, categoriesList } = useAppMuseum();

  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    category: 'Celebration',
    url: '',
    icon: '',
    description: '',
    screenshots: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.url.trim()) {
      alert('Please enter website name and URL');
      return;
    }

    const newApp = {
      name: formData.name.trim(),
      tagline: formData.tagline.trim() || '',
      category: formData.category,
      url: formData.url.trim().startsWith('http') ? formData.url.trim() : `https://${formData.url.trim()}`,
      icon: formData.icon.trim() || '',
      description: formData.description.trim() || formData.tagline.trim() || '',
      screenshots: formData.screenshots
        ? formData.screenshots.split('\n').map(s => s.trim()).filter(Boolean)
        : []
    };

    addApp(newApp);
    onClose();
    setFormData({
      name: '',
      tagline: '',
      category: 'Celebration',
      url: '',
      icon: '',
      description: '',
      screenshots: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">Add New Website</h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3.5 text-xs overflow-y-auto">
          
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Website / App Name *
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Birthday Card 3D"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Website URL (Visit Link) *
            </label>
            <input
              type="text"
              name="url"
              required
              placeholder="https://mywebsite.com"
              value={formData.url}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 bg-white"
              >
                {categoriesList.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Square Icon URL (optional)
              </label>
              <input
                type="text"
                name="icon"
                placeholder="https://... (image URL)"
                value={formData.icon}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Short Description / Tagline
            </label>
            <input
              type="text"
              name="tagline"
              placeholder="Short info shown on the card"
              value={formData.tagline}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Full Description (optional)
            </label>
            <textarea
              name="description"
              rows="3"
              placeholder="Website details shown on the detail page..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800"
            ></textarea>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Screenshot Image URL (optional)
            </label>
            <input
              type="text"
              name="screenshots"
              placeholder="https://... (screenshot image URL)"
              value={formData.screenshots}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800"
            />
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 font-medium text-slate-600 hover:text-slate-900 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Save Website
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
