import { createSlice } from "@reduxjs/toolkit";
import { getHistory } from "./thunks";

interface IHistoryItem {
  id: string;
  lastVisitTime: number;
  title: string;
  typedCount: number;
  url: string;
  visitCount: number;
}

interface historyState {
  loading: boolean;
  items: IHistoryItem[];
}

const initialState: historyState = {
  loading: false,
  items: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    deleteHistory(state) {
      console.log(state);
    },
  },
  extraReducers: {
    [`${getHistory.pending}`]: (state) => {
      state.loading = true;
    },
    [`${getHistory.fulfilled}`]: (state, action) => {
      state.loading = true;
      state.items = action.payload;
    },
  },
});

export const { deleteHistory } = historySlice.actions;
export default historySlice.reducer;
