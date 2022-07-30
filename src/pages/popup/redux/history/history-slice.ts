import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  addHistory,
  deleteAll,
  deleteItem,
  deleteRange,
  getHistory,
} from "./thunks";

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
  loading: true,
  items: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getHistory.fulfilled,
      (state, { payload }: PayloadAction<IHistoryItem[]>) => {
        state.items = payload;
        state.loading = false;
      }
    ),
      builder.addCase(
        addHistory.fulfilled,
        (state, { payload }: PayloadAction<IHistoryItem[]>) => {
          state.items.push(...payload);
        }
      ),
      builder.addCase(
        deleteItem.fulfilled,
        (state, { payload }: PayloadAction<string>) => {
          const filteredHistory = state.items.filter(
            (item) => item.url !== payload
          );

          state.items = filteredHistory;
        }
      ),
      builder.addCase(deleteAll.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(deleteAll.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      }),
      builder.addCase(deleteRange.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default historySlice.reducer;
