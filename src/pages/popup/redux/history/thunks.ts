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

export const deleteItem = createAsyncThunk(
  "history/deleteItem",
  async (url: string) => {
    // Delete URL occurrences of the URL
    await chrome.history.deleteUrl({ url });

    return url;
  }
);
