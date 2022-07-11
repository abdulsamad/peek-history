import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * All settings such as extension options, views should be in UI State
 */

// Active View
export enum Active {
  HISTORY,
  TABS,
}

// Open History/Tab's URL in
export enum OpenURL {
  NEW_TAB,
  CURRENT_PAGE,
}

interface UIState {
  searchOpened: boolean;
  active: Active;
  hideURL: boolean;
  openURL: OpenURL;
}

const initialState: UIState = {
  searchOpened: false,
  active: Active.HISTORY,
  hideURL: false,
  openURL: OpenURL.NEW_TAB,
};

const UISlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    switchActiveView: (state, { payload }: PayloadAction<Active>) => {
      state.active = payload;
    },
    setSearchOpened: (state, { payload }: PayloadAction<boolean>) => {
      state.searchOpened = payload;
    },
  },
});

export const { switchActiveView, setSearchOpened } = UISlice.actions;
export default UISlice.reducer;
