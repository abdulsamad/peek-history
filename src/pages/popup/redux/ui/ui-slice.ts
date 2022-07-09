import { createSlice } from "@reduxjs/toolkit";

/**
 * All settings such as extension options, views should be in UI State
 */

export enum Active {
  HISTORY,
  TABS,
}

interface UIState {
  loading: boolean;
  active: Active;
}

const initialState: UIState = {
  loading: false,
  active: Active.HISTORY,
};

const UISlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    switchActiveView: (state, action: { type: string; payload: Active }) => {
      state.active = action.payload;
    },
  },
});

export const { switchActiveView } = UISlice.actions;
export default UISlice.reducer;
