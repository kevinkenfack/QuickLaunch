# 🚀 QuickLaunch — Extension Chromium

> **QuickLaunch** est une extension Chromium moderne qui permet aux utilisateurs d'accéder rapidement à leurs sites favoris via une popup élégante et personnalisable.  
> Construite avec Vite, React, TypeScript, CRX, Tailwind CSS et DaisyUI pour une DX ultra fluide ⚡

---

## ✨ Objectif du projet

Créer une extension Chromium qui affiche, lorsqu'on clique dessus, une **popup stylée** contenant :

- 🔗 Une **grille de raccourcis** vers des sites populaires (YouTube, Docs, Drive…)  
- ➕ Un **bouton "Ajouter"** permettant à l'utilisateur d'ajouter ses propres raccourcis :
  - Nom personnalisé
  - URL personnalisée
  - Icône importée depuis son PC (convertie en Base64)
- 💾 Persistance automatique via `chrome.storage.sync`  
- 🧹 Mode édition pour supprimer ou réorganiser les raccourcis  
- 🌙 Thème clair/sombre avec DaisyUI

---

## 🧠 Stack technique

- ⚡ [Vite](https://vitejs.dev/) — Build ultra rapide  
- ⚛️ [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) — Composants et typage clair  
- 🧩 [CRX](https://crxjs.dev/vite-plugin) — Plugin Vite pour extensions Chromium  
- 🎨 [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) — Style rapide et modulaire  
- 💾 `chrome.storage.sync` — Pour stocker les raccourcis de l'utilisateur sans backend

---

## 📁 Structure du projet

```
quicklaunch/
├── public/
│   └── icons/                  # Icônes par défaut de l'extension (16, 19, 32, 38, 48 et 128px)
├── src/
│   ├── popup/                  # Interface principale affichée à l'ouverture
│   │   ├── Popup.tsx
│   │   ├── main.tsx
│   │   ├── index.html
│   │   └── components/
│   │       ├── ShortcutGrid.tsx
│   │       ├── AddShortcutModal.tsx
│   │       └── ShortcutItem.tsx
│   ├── options/                # Page d'options pour configuration avancée
│   │   ├── Options.tsx
│   │   ├── main.tsx
│   │   └── index.html
│   ├── background/             # Service worker background
│   │   └── index.ts
│   ├── storage/                # Fonctions pour gérer chrome.storage
│   │   └── index.ts
│   ├── types/                  # Définition TS des types (Shortcut, etc.)
│   │   └── index.ts
│   ├── utils/                  # Fonctions utilitaires
│   │   └── index.ts
│   └── index.css               # Styles globaux
├── manifest.json               # Manifest V3
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧰 Types de données

```ts
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
```

---

## 🚀 Installation et développement

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone <repo-url>
cd quicklaunch

# Installer les dépendances
npm install
```

### Développement
```bash
# Lancer le build en mode watch
npm run dev
```

### Charger l'extension dans le navigateur
1. Ouvrez Chrome/Edge/Brave
2. Allez sur `chrome://extensions/` (ou `edge://extensions/`)
3. Activez le **"Mode développeur"**
4. Cliquez **"Charger l'extension non empaquetée"**
5. Sélectionnez le dossier **`dist/`**

### Build de production
```bash
npm run build
```

---

## 🧪 Fonctionnalités implémentées

- [x] 📌 Affichage d'une liste de raccourcis par défaut dans la popup  
- [x] ➕ Ajout dynamique d'un raccourci avec nom + URL + icône  
- [x] 🧠 Persistance via `chrome.storage.sync`  
- [x] 🗑️ Suppression d'un raccourci (mode édition)
- [x] ✏️ Mode édition pour gérer les raccourcis
- [x] 🌙 30+ thèmes via DaisyUI (clair/sombre et colorés)
- [x] ⚙️ Page d'options pour configuration avancée
- [x] 📱 Interface responsive et moderne
- [x] ⌨️ Raccourci clavier (Ctrl+Shift+Q)
- [x] 🔄 Synchronisation entre appareils
- [x] 🎨 Animations et micro-interactions

---

## 🎯 Utilisation

### Popup principale
- Cliquez sur l'icône QuickLaunch dans la barre d'outils
- Cliquez sur un raccourci pour ouvrir le site dans un nouvel onglet
- Utilisez le bouton ✏️ pour activer le mode édition
- Ajoutez des raccourcis avec le bouton ➕

### Page d'options
- Accessible via le bouton ⚙️ dans la popup
- Personnalisez le thème parmi 30+ options
- Ajustez le nombre de colonnes (2-5)
- Réinitialisez les paramètres si nécessaire

### Raccourcis clavier
- `Ctrl+Shift+Q` (Windows/Linux) ou `Cmd+Shift+Q` (Mac) : Ouvrir QuickLaunch

---

## 🔧 Configuration

L'extension utilise `chrome.storage.sync` pour synchroniser automatiquement :
- Vos raccourcis personnalisés
- Vos préférences de thème
- Vos paramètres d'affichage

Aucune configuration supplémentaire n'est nécessaire !

---

## 🤝 Contribution

Ce projet est **100% open-source** ! Toutes les contributions sont les bienvenues 🎉

### 🚀 Comment contribuer

1. **Fork** le projet sur GitHub
2. **Clone** votre fork : `git clone https://github.com/VOTRE-USERNAME/QuickLaunch.git`
3. **Créez** une branche feature : `git checkout -b feature/ma-nouvelle-fonctionnalite`
4. **Développez** votre fonctionnalité
5. **Testez** que tout fonctionne : `npm run build`
6. **Committez** : `git commit -m "✨ Ajout: ma nouvelle fonctionnalité"`
7. **Push** : `git push origin feature/ma-nouvelle-fonctionnalite`
8. **Ouvrez** une Pull Request sur le repo principal

### 💡 Idées de contributions

- 🎨 Nouveaux thèmes DaisyUI
- 🔧 Nouvelles fonctionnalités (drag & drop, catégories...)
- 🐛 Corrections de bugs
- 📚 Amélioration de la documentation
- 🌍 Traductions (i18n)
- ⚡ Optimisations de performance
- 🧪 Tests unitaires

### 📋 Guidelines

- Respectez le style de code existant (TypeScript + React)
- Testez vos modifications avant de soumettre
- Documentez les nouvelles fonctionnalités
- Utilisez des commits descriptifs avec des emojis 😊

### 🐛 Signaler un bug

Ouvrez une [issue](https://github.com/kevinkenfack/QuickLaunch/issues) avec :
- Description claire du problème
- Étapes pour reproduire
- Version de Chrome/navigateur
- Captures d'écran si pertinent

---

## 📄 Licence

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- [Vite](https://vitejs.dev/) pour le build ultra-rapide
- [CRXJS](https://crxjs.dev/) pour l'intégration Vite + Extensions
- [DaisyUI](https://daisyui.com/) pour les composants élégants
- [Lucide](https://lucide.dev/) pour les icônes modernes