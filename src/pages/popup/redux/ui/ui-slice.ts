import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getShowUpdatePopup } from "./thunks";

/**
 * All settings such as extension options, views should be in UI State
 */

// Active View
export enum Active {
  HISTORY,
  TABS,
}

interface UIState {
  searchOpened: boolean;
  active: Active;
  showUpdatePopup: boolean;
}

const initialState: UIState = {
  searchOpened: false,
  active: Active.HISTORY,
  showUpdatePopup: false,
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
    setShowUpdatePopup: (state, { payload }: PayloadAction<boolean>) => {
      state.showUpdatePopup = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getShowUpdatePopup.fulfilled,
      (state, { payload }: PayloadAction<boolean>) => {
        state.showUpdatePopup = payload;
      }
    );
  },
});

export const { switchActiveView, setSearchOpened, setShowUpdatePopup } =
  UISlice.actions;
export default UISlice.reducer;
