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
    deleteItem(state, action) {
      // Delete item
      chrome.history.deleteUrl({ url: action.payload }, () => {
        // Filter out the deleted history item
        return state.items.filter((item) => item.url !== action.payload);
      });
    },
  },
  extraReducers: {
    [`${getHistory.pending}`]: (state) => {
      state.loading = true;
    },
    [`${getHistory.fulfilled}`]: (state, action) => {
      state.loading = true;
      state.items = action.payload;
      state.loading = false;
    },
  },
});

export const { deleteItem } = historySlice.actions;
export default historySlice.reducer;
