import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSettingsFromStorage = createAsyncThunk(
  "settings/getSettingsFromStorage",
  async () => {
    const storage = await chrome.storage.sync.get(null);

    return {
      theme: storage.theme,
      accent: storage.accent,
      accentFont: storage.accentFont,
      font: storage.font,
      hideTime: storage.hideTime,
      hideURL: storage.hideURL,
      infinite: storage.infinite,
      openURL: storage.openURL,
      popupWidth: storage.popupWidth,
      sort: storage.sort,
    };
  }
);
