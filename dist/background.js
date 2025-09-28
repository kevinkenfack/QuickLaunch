// Background script pour QuickLaunch
// Gère les événements de l'extension en arrière-plan

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('QuickLaunch installé avec succès !');
    
    // Optionnel : ouvrir la page d'options au premier lancement
    // chrome.tabs.create({ url: chrome.runtime.getURL('src/options/index.html') });
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
