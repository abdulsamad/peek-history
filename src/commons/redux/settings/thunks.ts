import { createAsyncThunk } from "@reduxjs/toolkit";

import { settings } from "./defaults";

export const getSettingsFromStorage = createAsyncThunk(
  "settings/getSettingsFromStorage",
  async () => {
    const storage = await chrome.storage.sync.get(null);

    return {
      theme: storage.theme ?? settings.theme,
      accent: storage.accent ?? settings.accent,
      accentFont: storage.accentFont ?? settings.accentFont,
      font: storage.font ?? settings.font,
      hideTime: storage.hideTime ?? settings.hideTime,
      hideURL: storage.hideURL ?? settings.hideURL,
      infinite: storage.infinite ?? settings.infinite,
      openURL: storage.openURL ?? settings.openURL,
      popupWidth: storage.popupWidth ?? settings.popupWidth,
      sort: storage.sort ?? settings.sort,
    };
  }
);
