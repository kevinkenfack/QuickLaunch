import { Shortcut, AppSettings } from '../types';

const SHORTCUTS_KEY = 'quicklaunch_shortcuts';
const SETTINGS_KEY = 'quicklaunch_settings';
const ICONS_CACHE_KEY = 'quicklaunch_icons_cache';
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

// Paramètres par défaut
export const defaultSettings: AppSettings = {
  theme: 'light',
  gridColumns: 3,
  backgroundImage: '',
  backgroundOpacity: 0.1
};

/// Images d'arrière-plan par défaut (Unsplash)
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

// Cache des icônes
interface IconCache { [url: string]: string; }

// Cache des backgrounds
interface BackgroundCache { [url: string]: string; }

// ✅ ICÔNES
export const downloadAndCacheIcon = async (iconUrl: string): Promise<string> => {
  try {
    const cache = await getIconCache();
    if (cache[iconUrl]) return cache[iconUrl];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const response = await fetch(iconUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error('Failed to fetch icon');
    const blob = await response.blob();
    if (blob.size > 500 * 1024) throw new Error('Icon too large');

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        await saveIconToCache(iconUrl, base64);
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Erreur téléchargement icône:', error);
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzk0YTNiOCIvPjwvc3ZnPg==';
  }
};

const getIconCache = async (): Promise<IconCache> => {
  const result = await chrome.storage.local.get([ICONS_CACHE_KEY]);
  return result[ICONS_CACHE_KEY] || {};
};

const saveIconToCache = async (url: string, base64: string): Promise<void> => {
  const cache = await getIconCache();
  cache[url] = base64;
  await chrome.storage.local.set({ [ICONS_CACHE_KEY]: cache });
};

export const initializeDefaultIcons = async (): Promise<void> => {
  const cache = await getIconCache();
  let shortcuts = await getShortcuts();
  const defaultIconsInCache = shortcuts.filter(s => s.isDefault).every(s => s.icon.startsWith('data:') || cache[s.icon]);
  if (defaultIconsInCache) return;

  const updatedShortcuts = await Promise.all(
    shortcuts.map(async (shortcut) => {
      if (shortcut.isDefault && !shortcut.icon.startsWith('data:')) {
        if (cache[shortcut.icon]) return { ...shortcut, icon: cache[shortcut.icon] };
        try {
          const base64 = await downloadAndCacheIcon(shortcut.icon);
          return { ...shortcut, icon: base64 };
        } catch { return shortcut; }
      }
      return shortcut;
    })
  );
  await saveShortcuts(updatedShortcuts);
};

// ✅ BACKGROUNDS
export const downloadAndCacheBackground = async (imageUrl: string): Promise<string> => {
  const result = await chrome.storage.local.get([BACKGROUND_CACHE_KEY]);
  const cache: BackgroundCache = result[BACKGROUND_CACHE_KEY] || {};
  if (cache[imageUrl]) return cache[imageUrl];

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);
  const response = await fetch(imageUrl, { signal: controller.signal });
  clearTimeout(timeoutId);
  if (!response.ok) throw new Error('Failed to fetch background');

  const blob = await response.blob();
  if (blob.size > 2 * 1024 * 1024) throw new Error('Background too large');

  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      cache[imageUrl] = base64;
      await chrome.storage.local.set({ [BACKGROUND_CACHE_KEY]: cache });
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// ✅ SHORTCUTS
export const getShortcuts = async (): Promise<Shortcut[]> => {
  const result = await chrome.storage.sync.get([SHORTCUTS_KEY]);
  return result[SHORTCUTS_KEY] || defaultShortcuts;
};

export const saveShortcuts = async (shortcuts: Shortcut[]): Promise<void> => {
  await chrome.storage.sync.set({ [SHORTCUTS_KEY]: shortcuts });
};

export const addShortcut = async (shortcut: Shortcut): Promise<void> => {
  const shortcuts = await getShortcuts();
  shortcuts.push(shortcut);
  await saveShortcuts(shortcuts);
};

export const removeShortcut = async (id: string): Promise<void> => {
  const shortcuts = await getShortcuts();
  await saveShortcuts(shortcuts.filter(s => s.id !== id));
};

export const reorderShortcuts = async (startIndex: number, endIndex: number): Promise<void> => {
  const shortcuts = await getShortcuts();
  const [removed] = shortcuts.splice(startIndex, 1);
  shortcuts.splice(endIndex, 0, removed);
  await saveShortcuts(shortcuts);
};

// ✅ SETTINGS
export const getSettings = async (): Promise<AppSettings> => {
  const result = await chrome.storage.sync.get([SETTINGS_KEY]);
  return { ...defaultSettings, ...result[SETTINGS_KEY] };
};

export const saveSettings = async (settings: AppSettings): Promise<void> => {
  await chrome.storage.sync.set({ [SETTINGS_KEY]: settings });
};
