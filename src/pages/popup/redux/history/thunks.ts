import { createAsyncThunk } from "@reduxjs/toolkit";

export const getHistory = createAsyncThunk(
  "history/getHistory",
  async ({
    text = "",
    maxResults = 50,
    startTime = 157784760000, // 1975
    endTime,
  }: {
    text?: string;
    maxResults?: number;
    startTime?: number;
    endTime?: number;
  }) => {
    const historyItems = await chrome.history.search({
      text,
      maxResults,
      startTime,
      endTime,
    });

    return historyItems;
  }
);
