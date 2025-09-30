import React, { useState, useEffect } from 'react';
import { Settings, Plus, Edit3, Github } from 'lucide-react';
import ShortcutGrid from './components/ShortcutGrid';
import AddShortcutModal from './components/AddShortcutModal';
import { Shortcut, AppSettings } from '../types';
import { getShortcuts, getSettings, saveSettings, initializeDefaultIcons } from '../storage';

const Popup: React.FC = () => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [settings, setSettings] = useState<AppSettings>({ theme: 'light', gridColumns: 3 });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  const loadData = async () => {
    try {
      // Initialiser les icônes par défaut si nécessaire
      await initializeDefaultIcons();
      
      const [loadedShortcuts, loadedSettings] = await Promise.all([
        getShortcuts(),
        getSettings()
      ]);
      setShortcuts(loadedShortcuts);
      setSettings(loadedSettings);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShortcutsChange = () => {
    loadData();
  };

  const toggleTheme = async () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    const newSettings = { ...settings, theme: newTheme };
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  const openOptionsPage = () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('src/options/index.html') });
  };

  const openGitHub = () => {
    chrome.tabs.create({ url: 'https://github.com/kevinkenfack/QuickLaunch' });
  };

  if (loading) {
    return (
      <div className="w-96 h-64 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="w-96 min-h-64 bg-base-100">
      {/* Header */}
      <div className="navbar bg-base-200 px-4 py-2">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-primary">🚀 QuickLaunch</h1>
        </div>
        <div className="flex-none gap-2">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setIsEditMode(!isEditMode)}
            title={isEditMode ? "Quitter le mode édition" : "Mode édition"}
          >
            <Edit3 size={16} />
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={toggleTheme}
            title="Changer de thème"
          >
            {settings.theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={openOptionsPage}
            title="Options"
          >
            <Settings size={16} />
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={openGitHub}
            title="GitHub - Contribuer"
          >
            <Github size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <ShortcutGrid
          shortcuts={shortcuts}
          gridColumns={settings.gridColumns}
          isEditMode={isEditMode}
          onShortcutsChange={handleShortcutsChange}
        />

        {/* Add Button */}
        <div className="mt-4 flex justify-center">
          <button
            className="btn btn-primary btn-sm gap-2"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} />
            Ajouter un raccourci
          </button>
        </div>

        {/* Open Source Notice */}
        <div className="mt-4 text-center">
          <p className="text-xs text-base-content/60">
            🌟 Projet open-source • 
            <button 
              className="link link-primary ml-1"
              onClick={openGitHub}
            >
              Contribuer sur GitHub
            </button>
          </p>
        </div>
      </div>

      {/* Add Shortcut Modal */}
      <AddShortcutModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onShortcutAdded={handleShortcutsChange}
      />
    </div>
  );
};

export default Popup;