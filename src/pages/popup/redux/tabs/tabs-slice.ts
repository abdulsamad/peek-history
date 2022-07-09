import { createSlice } from "@reduxjs/toolkit";
import {} from "./thunks";

const initialState = {};

const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    getDevices: (state) => {
      //
    },
  },
});

export const { getDevices } = tabsSlice.actions;
export default tabsSlice.reducer;
