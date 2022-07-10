import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getHistory } from "./thunks";

export interface IHistoryItem {
  id: string;
  lastVisitTime?: number;
  title?: string;
  typedCount?: number;
  url?: string;
  visitCount?: number;
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
    deleteItem(state, action: PayloadAction<string>) {
      // Delete item
      chrome.history.deleteUrl({ url: action.payload }, () => {
        // Filter out the deleted history item
        return state.items.filter((item) => item.url !== action.payload);
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHistory.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(getHistory.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      });
  },
});

export const { deleteItem } = historySlice.actions;
export default historySlice.reducer;
