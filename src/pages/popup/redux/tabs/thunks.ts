import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRecentlyClosed = createAsyncThunk(
  "tabs/getRecentlyClosed",
  async () => {
    const tabs = await chrome.sessions.getRecentlyClosed();
    return tabs;
  }
);

export const getDevices = createAsyncThunk("tabs/getDevices", async () => {
  const deviceItems = await chrome.sessions.getDevices();
  return deviceItems;
});

export const restoreSession = createAsyncThunk(
  "tabs/restoreSession",
  async (sessionId: string) => {
    const restoredSession = await chrome.sessions.restore(sessionId);
    return restoredSession;
  }
);
