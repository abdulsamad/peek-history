import { createSlice } from "@reduxjs/toolkit";

/**
 * All settings such as extension options, views should be in UI State
 */

export enum Active {
  HISTORY,
  TABS,
}

interface UIState {
  searchOpened: boolean;
  active: Active;
}

const initialState: UIState = {
  searchOpened: false,
  active: Active.HISTORY,
};

const UISlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    switchActiveView: (state, { payload }: { payload: Active }) => {
      state.active = payload;
    },
    setSearchOpened: (state, { payload }: { payload: boolean }) => {
      state.searchOpened = payload;
    },
  },
});

export const { switchActiveView, setSearchOpened } = UISlice.actions;
export default UISlice.reducer;
