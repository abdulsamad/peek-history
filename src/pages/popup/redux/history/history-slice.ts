import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { deleteItem, getHistory } from "./thunks";

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHistory.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        getHistory.fulfilled,
        (state, { payload }: PayloadAction<IHistoryItem[]>) => {
          state.items = payload;
          state.loading = false;
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
      );
  },
});

// export const {  } = historySlice.actions;
export default historySlice.reducer;
