import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHistory = createAsyncThunk("history", async () => {
  const response = await chrome.history.search({ text: "", maxResults: 50 });

  return response;
});
