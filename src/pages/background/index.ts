chrome.runtime.onInstalled.addListener((details) => {
  switch (details.reason) {
    case "update":
      chrome.storage.sync.set({ showUpdatePopup: true });
      break;
  }
});
