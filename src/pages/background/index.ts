chrome.runtime.onInstalled.addListener((details) => {
  switch (details.reason) {
    case "update":
      chrome.storage.sync.set({ showUpdatePopup: true });

      // Keys saved by mistake by version 2.0.1 and earlier
      chrome.storage.sync.remove([
        "settings/getSettingsFromStorage/pending",
        "settings/getSettingsFromStorage/fulfilled",
        "settings/getSettingsFromStorage/rejected",
      ]);
      break;
  }
});
