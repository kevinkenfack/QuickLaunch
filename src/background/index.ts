// Background script pour QuickLaunch
// Gère les événements de l'extension en arrière-plan
import { initializeDefaultIcons } from '../storage';

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('QuickLaunch installé avec succès !');
    
    // Initialiser les icônes par défaut en arrière-plan
    initializeDefaultIcons().catch(console.error);
  } else if (details.reason === 'update') {
    console.log('QuickLaunch mis à jour !');
    
    // Vérifier et mettre à jour les icônes si nécessaire
    initializeDefaultIcons().catch(console.error);
  }
});

// Gestion des raccourcis clavier (optionnel)
chrome.commands.onCommand.addListener((command) => {
  if (command === 'open-quicklaunch') {
    // Ouvrir la popup programmatiquement si nécessaire
    chrome.action.openPopup();
  }
});

// Gestion des mises à jour de l'extension
chrome.runtime.onUpdateAvailable.addListener(() => {
  console.log('Mise à jour disponible pour QuickLaunch');
});