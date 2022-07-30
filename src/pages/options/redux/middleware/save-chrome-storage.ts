import { PayloadAction } from "@reduxjs/toolkit";

type nextType = (action: PayloadAction) => void;

/**
 * Filters action on settings slice and saves the payload with filtered key (By removing slice name and other parts) in chrome.storage.sync and dispatch
 */
const saveChromeStorage =
  () => (next: nextType) => async (action: PayloadAction) => {
    // Action is dispatched on settings slice
    if (action.type && action.type.includes("settings")) {
      const filteredSliceName = action.type.replace("settings/set", "");
      const lowercasedFirstLetter = filteredSliceName.charAt(0).toLowerCase();
      const key = lowercasedFirstLetter + filteredSliceName.slice(1);

      await chrome.storage.sync.set({ [key]: action.payload });
    }

    next(action);
  };

export default saveChromeStorage;
