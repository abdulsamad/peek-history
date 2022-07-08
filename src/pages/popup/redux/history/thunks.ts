import { createAsyncThunk } from "@reduxjs/toolkit";

export const getHistory = createAsyncThunk("history/getHistory", async () => {
  const historyItems = await chrome.history.search({
    text: "",
    maxResults: 50,
    startTime: 157784760000,
  });

  return historyItems;
});
