import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, Palette, Github, Heart } from 'lucide-react';
import { AppSettings } from '../types';
import { getSettings, saveSettings, defaultSettings } from '../storage';

const Options: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const themes = [
    'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate',
    'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden',
    'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black',
    'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade',
    'night', 'coffee', 'winter'
  ];

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  const loadSettings = async () => {
    try {
      const loadedSettings = await getSettings();
      setSettings(loadedSettings);
    } catch (error) {
      console.error('Erreur lors du chargement des paramètres:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSettings(settings);
      setMessage('Paramètres sauvegardés avec succès !');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Erreur lors de la sauvegarde');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
      setSettings(defaultSettings);
      await saveSettings(defaultSettings);
      setMessage('Paramètres réinitialisés !');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const openGitHub = () => {
    chrome.tabs.create({ url: 'https://github.com/kevinkenfack/QuickLaunch' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            🚀 QuickLaunch - Options
          </h1>
          <p className="text-base-content/70">
            Personnalisez votre expérience QuickLaunch
          </p>
        </div>

        {message && (
          <div className="alert alert-success mb-6">
            <span>{message}</span>
          </div>
        )}

        <div className="grid gap-6">
          {/* Apparence */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2">
                <Palette size={20} />
                Apparence
              </h2>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Thème</span>
                </label>
                <select
                  className="select select-bordered"
                  value={settings.theme}
                  onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                >
                  {themes.map((theme) => (
                    <option key={theme} value={theme}>
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Colonnes de la grille</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="5"
                  value={settings.gridColumns}
                  onChange={(e) => setSettings({ ...settings, gridColumns: parseInt(e.target.value) })}
                  className="range range-primary"
                  step="1"
                />
                <div className="w-full flex justify-between text-xs px-2">
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
                <label className="label">
                  <span className="label-text-alt">
                    Actuellement: {settings.gridColumns} colonnes
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Arrière-plan */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2">
                <Image size={20} />
                Arrière-plan
              </h2>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Arrière-plans prédéfinis</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {defaultBackgrounds.map((bg, index) => (
                    <div
                      key={index}
                      className={`
                        card bg-base-300 cursor-pointer transition-all hover:scale-105
                        ${!settings.backgroundImage && !bg.url ? 'ring-2 ring-primary' : ''}
                        ${settings.backgroundImage && bg.url && settings.backgroundImage.includes('unsplash') ? 'ring-2 ring-primary' : ''}
                      `}
                      onClick={() => handleBackgroundSelect(bg.url)}
                    >
                      <div className="card-body p-2">
                        {bg.preview ? (
                          <img
                            src={bg.preview}
                            alt={bg.name}
                            className="w-full h-16 object-cover rounded"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-16 bg-base-100 rounded flex items-center justify-center">
                            <span className="text-xs">Aucun</span>
                          </div>
                        )}
                        <p className="text-xs text-center mt-1">{bg.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Arrière-plan personnalisé</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCustomBackground}
                  className="file-input file-input-bordered"
                  disabled={backgroundLoading}
                />
                <label className="label">
                  <span className="label-text-alt">
                    Formats supportés: JPG, PNG, WebP (max 2MB)
                  </span>
                </label>
              </div>

              {settings.backgroundImage && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Opacité de l'arrière-plan</span>
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={settings.backgroundOpacity}
                    onChange={(e) => setSettings({ ...settings, backgroundOpacity: parseFloat(e.target.value) })}
                    className="range range-primary"
                  />
                  <div className="w-full flex justify-between text-xs px-2">
                    <span>10%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                  <label className="label">
                    <span className="label-text-alt">
                      Actuellement: {Math.round(settings.backgroundOpacity * 100)}%
                    </span>
                  </label>
                </div>
              )}

              {backgroundLoading && (
                <div className="alert alert-info">
                  <span className="loading loading-spinner loading-sm"></span>
                  <span>Téléchargement de l'arrière-plan en cours...</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <button
              className="btn btn-outline gap-2"
              onClick={handleReset}
              disabled={saving}
            >
              <RotateCcw size={16} />
              Réinitialiser
            </button>
            <button
              className="btn btn-primary gap-2"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <Save size={16} />
              )}
              Sauvegarder
            </button>
          </div>
        </div>

        {/* Informations */}
        <div className="mt-12 text-center text-base-content/50">
          <p>QuickLaunch v1.0.0</p>
          <p>Extension pour accès rapide à vos sites favoris</p>
          
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-red-500" />
              <span className="text-sm">Projet open-source</span>
            </div>
            <button
              className="btn btn-outline btn-sm gap-2"
              onClick={openGitHub}
            >
              <Github size={16} />
              Contribuer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;