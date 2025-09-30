import { Shortcut, AppSettings } from '../types';

const SHORTCUTS_KEY = 'quicklaunch_shortcuts';
const SETTINGS_KEY = 'quicklaunch_settings';
const ICONS_CACHE_KEY = 'quicklaunch_icons_cache';
const BACKGROUND_CACHE_KEY = 'quicklaunch_background_cache';
const BACKGROUND_CACHE_KEY = 'quicklaunch_background_cache';

// Raccourcis par défaut
export const defaultShortcuts: Shortcut[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://youtube.com',
    icon: 'https://www.youtube.com/favicon.ico',
    isDefault: true
  },
  {
    id: 'gmail',
    name: 'Gmail',
    url: 'https://mail.google.com',
    icon: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico',
    isDefault: true
  },
  {
    id: 'drive',
    name: 'Drive',
    url: 'https://drive.google.com',
    icon: 'https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png',
    isDefault: true
  },
  {
    id: 'docs',
    name: 'Docs',
    url: 'https://docs.google.com',
    icon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico',
    isDefault: true
  },
  {
    id: 'sheets',
    name: 'Sheets',
    url: 'https://sheets.google.com',
    icon: 'https://ssl.gstatic.com/docs/spreadsheets/spreadsheets_2023q4.ico',
    isDefault: true
  },
  {
    id: 'calendar',
    name: 'Calendar',
    url: 'https://calendar.google.com',
    icon: 'https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_28.ico',
    isDefault: true
  },
  {
    id: 'gemini',
    name: 'Gemini',
    url: 'https://gemini.google.com',
    icon: 'https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg',
    isDefault: true
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    url: 'https://web.whatsapp.com',
    icon: 'https://web.whatsapp.com/favicon.ico',
    isDefault: true
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com',
    icon: 'https://github.com/favicon.ico',
    isDefault: true
  }
];

export const defaultSettings: AppSettings = {
  theme: 'light',
  gridColumns: 3,
  backgroundImage: '',
  backgroundOpacity: 0.1
  backgroundImage: '',
  backgroundOpacity: 0.1
};

// Images d'arrière-plan par défaut (Unsplash)
export const defaultBackgrounds = [
  {
    name: 'Aucun arrière-plan',
    url: '',
    preview: ''
  },
  {
    name: 'Montagne abstraite',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop'
  },
  {
    name: 'Gradient coloré',
    url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&h=600&fit=crop',
    preview: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=200&h=150&fit=crop'
  },
  {
    name: 'Formes géométriques',
    url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&h=600&fit=crop',
    preview: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=200&h=150&fit=crop'
  },
  {
    name: 'Vagues abstraites',
    url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop',
    preview: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200&h=150&fit=crop'
  },
  {
    name: 'Texture minimaliste',
    url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=600&fit=crop',
    preview: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=200&h=150&fit=crop'
  }
];

// Cache des icônes en base64
interface IconCache {
  [url: string]: string;
}

// Fonction pour télécharger et convertir une icône en base64
export const downloadAndCacheIcon = async (iconUrl: string): Promise<string> => {
  try {
    // Vérifier d'abord le cache
    const cache = await getIconCache();
    if (cache[iconUrl]) {
      return cache[iconUrl];
    }

    // Télécharger l'icône avec timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 secondes timeout
    
    const response = await fetch(iconUrl);
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error('Failed to fetch icon');
    
    const blob = await response.blob();
    
    // Vérifier la taille du blob (max 500KB)
    if (blob.size > 500 * 1024) {
      throw new Error('Icon too large');
    }
    
    // Convertir en base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        
        // Sauvegarder dans le cache
        await saveIconToCache(iconUrl, base64);
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'icône:', error);
    // Retourner une icône par défaut en cas d'erreur
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzk0YTNiOCIvPgo8cGF0aCBkPSJNMTIgOGMtMi4yMSAwLTQgMS43OS00IDRzMS43OSA0IDQgNCA0LTEuNzkgNC00LTEuNzktNC00LTR6bTAgNmMtMS4xIDAtMi0uOS0yLTJzLjktMiAyLTIgMiAuOSAyIDItLjkgMi0yIDJ6IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
  }
};

// Récupérer le cache des icônes
const getIconCache = async (): Promise<IconCache> => {
  try {
    const result = await chrome.storage.local.get([ICONS_CACHE_KEY]);
    return result[ICONS_CACHE_KEY] || {};
  } catch (error) {
    console.error('Erreur lors de la récupération du cache des icônes:', error);
    return {};
  }
};

// Sauvegarder une icône dans le cache
const saveIconToCache = async (url: string, base64: string): Promise<void> => {
  try {
    const cache = await getIconCache();
    cache[url] = base64;
    await chrome.storage.local.set({ [ICONS_CACHE_KEY]: cache });
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'icône dans le cache:', error);
  }
};

// Initialiser les icônes par défaut dans le cache
export const initializeDefaultIcons = async (): Promise<void> => {
  try {
    // Vérifier si les icônes sont déjà toutes en cache
    const cache = await getIconCache();
    let shortcuts = await getShortcuts();
    
    // Vérifier si toutes les icônes par défaut sont déjà en cache
    const defaultIconsInCache = shortcuts
      .filter(s => s.isDefault)
      .every(s => s.icon.startsWith('data:') || cache[s.icon]);
    
    if (defaultIconsInCache) {
      // Toutes les icônes sont déjà en cache, pas besoin de télécharger
      return;
    }

    // Télécharger seulement les icônes manquantes
    const updatedShortcuts = await Promise.all(
      shortcuts.map(async (shortcut) => {
        if (shortcut.isDefault && !shortcut.icon.startsWith('data:')) {
          if (cache[shortcut.icon]) {
            return { ...shortcut, icon: cache[shortcut.icon] };
          } else {
            try {
              const cachedIcon = await downloadAndCacheIcon(shortcut.icon);
              return { ...shortcut, icon: cachedIcon };
            } catch (error) {
              console.error(`Erreur lors de la mise en cache de l'icône pour ${shortcut.name}:`, error);
              return shortcut;
            }
          }
        }
        return shortcut;
      })
    );

    await saveShortcuts(updatedShortcuts);
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des icônes:', error);
  }
};

// Fonction pour télécharger et mettre en cache une image d'arrière-plan
export const downloadAndCacheBackground = async (imageUrl: string): Promise<string> => {
  try {
    // Vérifier d'abord le cache
    const result = await chrome.storage.local.get([BACKGROUND_CACHE_KEY]);
    const cache = result[BACKGROUND_CACHE_KEY] || {};
    
    if (cache[imageUrl]) {
      return cache[imageUrl];
    }

    // Télécharger l'image
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 secondes pour les images plus grandes
    
    const response = await fetch(imageUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error('Failed to fetch background image');
    
    const blob = await response.blob();
    
    // Vérifier la taille (max 2MB pour les arrière-plans)
    if (blob.size > 2 * 1024 * 1024) {
      throw new Error('Background image too large (max 2MB)');
    }
    
    // Convertir en base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        
        // Sauvegarder dans le cache
        cache[imageUrl] = base64;
        await chrome.storage.local.set({ [BACKGROUND_CACHE_KEY]: cache });
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'arrière-plan:', error);
    throw error;
  }
};

// Fonction pour télécharger et mettre en cache une image d'arrière-plan
export const downloadAndCacheBackground = async (imageUrl: string): Promise<string> => {
  try {
    // Vérifier d'abord le cache
    const result = await chrome.storage.local.get([BACKGROUND_CACHE_KEY]);
    const cache = result[BACKGROUND_CACHE_KEY] || {};
    
    if (cache[imageUrl]) {
      return cache[imageUrl];
    }

    // Télécharger l'image
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 secondes pour les images plus grandes
    
    const response = await fetch(imageUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error('Failed to fetch background image');
    
    const blob = await response.blob();
    
    // Vérifier la taille (max 2MB pour les arrière-plans)
    if (blob.size > 2 * 1024 * 1024) {
      throw new Error('Background image too large (max 2MB)');
    }
    
    // Convertir en base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        
        // Sauvegarder dans le cache
        cache[imageUrl] = base64;
        await chrome.storage.local.set({ [BACKGROUND_CACHE_KEY]: cache });
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'arrière-plan:', error);
    throw error;
  }
};

export const getShortcuts = async (): Promise<Shortcut[]> => {
  try {
    const result = await chrome.storage.sync.get([SHORTCUTS_KEY]);
    return result[SHORTCUTS_KEY] || defaultShortcuts;
  } catch (error) {
    console.error('Erreur lors de la récupération des raccourcis:', error);
    return defaultShortcuts;
  }
};

export const saveShortcuts = async (shortcuts: Shortcut[]): Promise<void> => {
  try {
    await chrome.storage.sync.set({ [SHORTCUTS_KEY]: shortcuts });
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des raccourcis:', error);
  }
};

export const addShortcut = async (shortcut: Shortcut): Promise<void> => {
  const shortcuts = await getShortcuts();
  shortcuts.push(shortcut);
  await saveShortcuts(shortcuts);
};

export const removeShortcut = async (id: string): Promise<void> => {
  const shortcuts = await getShortcuts();
  const filteredShortcuts = shortcuts.filter(s => s.id !== id);
  await saveShortcuts(filteredShortcuts);
};

export const reorderShortcuts = async (startIndex: number, endIndex: number): Promise<void> => {
  const shortcuts = await getShortcuts();
  const [removed] = shortcuts.splice(startIndex, 1);
  shortcuts.splice(endIndex, 0, removed);
  await saveShortcuts(shortcuts);
};

export const getSettings = async (): Promise<AppSettings> => {
  try {
    const result = await chrome.storage.sync.get([SETTINGS_KEY]);
    return { ...defaultSettings, ...result[SETTINGS_KEY] };
  } catch (error) {
    console.error('Erreur lors de la récupération des paramètres:', error);
    return defaultSettings;
  }
};

export const saveSettings = async (settings: AppSettings): Promise<void> => {
  try {
    await chrome.storage.sync.set({ [SETTINGS_KEY]: settings });
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des paramètres:', error);
  }
};