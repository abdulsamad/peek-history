import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ISettings, settings as initialState } from "./defaults";
import { getSettingsFromStorage } from "./thunks";

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme(state, { payload }: PayloadAction<"default" | "dark" | "light">) {
      state.theme = payload;
    },
    setFont(state, { payload }: PayloadAction<string>) {
      state.font = payload;
    },
    setAccent(state, { payload }: PayloadAction<string>) {
      state.accent = payload;
    },
    setAccentFont(state, { payload }: PayloadAction<string>) {
      state.accentFont = payload;
    },
    setPopupWidth(state, { payload }: PayloadAction<number>) {
      state.popupWidth = payload;
    },
    setHideURL(state, { payload }: PayloadAction<boolean>) {
      state.hideURL = payload;
    },
    setSort(state, { payload }: PayloadAction<"last-visit" | "most-visit">) {
      state.sort = payload;
    },
    setInfinite(state, { payload }: PayloadAction<boolean>) {
      state.infinite = payload;
    },
    setOpenURL(
      state,
      { payload }: PayloadAction<"new-tab" | "current-tab" | "background-tab">
    ) {
      state.openURL = payload;
    },
    setHideTime(state, { payload }: PayloadAction<boolean>) {
      state.hideTime = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getSettingsFromStorage.fulfilled,
      (state, { payload }: PayloadAction<ISettings>) => {
        state.theme = payload.theme;
        state.accent = payload.accent;
        state.accentFont = payload.accentFont;
        state.font = payload.font;
        state.hideTime = payload.hideTime;
        state.hideURL = payload.hideURL;
        state.infinite = payload.infinite;
        state.openURL = payload.openURL;
        state.popupWidth = payload.popupWidth;
        state.sort = payload.sort;
      }
    );
  },
});

export const {
  setTheme,
  setAccent,
  setAccentFont,
  setFont,
  setHideTime,
  setHideURL,
  setInfinite,
  setOpenURL,
  setPopupWidth,
  setSort,
} = settingsSlice.actions;
export default settingsSlice.reducer;
