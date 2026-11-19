import { createSlice } from "@reduxjs/toolkit";

import { addHistory, deleteAll, deleteItem, getHistory } from "./thunks";

export interface IHistoryItem {
  id: string;
  lastVisitTime?: number;
  title?: string;
  typedCount?: number;
  url?: string;
  visitCount?: number;
}

export interface HistoryState {
  loading: boolean;
  items: IHistoryItem[];
  remaining: boolean;
  // Search text the list was loaded with, next pages continue with it
  query: string;
  // End time for the next page
  cursor?: number;
  // requestId of the getHistory call that loaded the list, older responses are ignored
  searchId?: string;
  // requestId of the addHistory call loading the next page
  loadingMore?: string;
}

const initialState: HistoryState = {
  loading: true,
  items: [],
  remaining: false,
  query: "",
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHistory.pending, (state, { meta }) => {
        state.query = meta.arg.text ?? "";
        state.searchId = meta.requestId;
        state.loadingMore = undefined;
      })
      .addCase(getHistory.fulfilled, (state, { payload, meta }) => {
        // A newer search was started while this one was loading
        if (meta.requestId !== state.searchId) return;

        state.items = payload.items;
        state.cursor = payload.cursor;
        state.remaining = payload.remaining;
        state.loading = false;
      })
      .addCase(getHistory.rejected, (state, { meta }) => {
        if (meta.requestId === state.searchId) state.loading = false;
      })
      // Update/Append history
      .addCase(addHistory.pending, (state, { meta }) => {
        state.loadingMore = meta.requestId;
      })
      .addCase(addHistory.fulfilled, (state, { payload, meta }) => {
        if (state.loadingMore === meta.requestId) state.loadingMore = undefined;

        // The list was replaced by a newer search while this page was loading
        if (payload.searchId !== state.searchId) return;

        state.items.push(...payload.items);
        state.cursor = payload.cursor;
        state.remaining = payload.remaining;
      })
      .addCase(addHistory.rejected, (state, { meta }) => {
        if (state.loadingMore === meta.requestId) state.loadingMore = undefined;
      })
      .addCase(deleteItem.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((item) => item.url !== payload);
      })
      .addCase(deleteAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAll.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.remaining = false;
        state.cursor = undefined;
      })
      .addCase(deleteAll.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default historySlice.reducer;
