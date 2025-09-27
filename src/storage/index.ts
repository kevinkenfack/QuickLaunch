import { Shortcut, AppSettings } from '../types';

const SHORTCUTS_KEY = 'quicklaunch_shortcuts';
const SETTINGS_KEY = 'quicklaunch_settings';

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
    url: 'https://gmail.com',
    icon: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico',
    isDefault: true
  },
  {
    id: 'drive',
    name: 'Google Drive',
    url: 'https://drive.google.com',
    icon: 'https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png',
    isDefault: true
  },
  {
    id: 'docs',
    name: 'Google Docs',
    url: 'https://docs.google.com',
    icon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico',
    isDefault: true
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com',
    icon: 'https://github.com/favicon.ico',
    isDefault: true
  },
  {
    id: 'twitter',
    name: 'Twitter',
    url: 'https://twitter.com',
    icon: 'https://abs.twimg.com/favicons/twitter.2.ico',
    isDefault: true
  }
];

export const defaultSettings: AppSettings = {
  theme: 'light',
  gridColumns: 3
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