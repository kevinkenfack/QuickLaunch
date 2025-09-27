export interface Shortcut {
  id: string;
  name: string;
  url: string;
  icon: string; // base64 data URL ou URL d'icône
  isDefault?: boolean;
}

export interface AppSettings {
  theme: string;
  gridColumns: number;
}