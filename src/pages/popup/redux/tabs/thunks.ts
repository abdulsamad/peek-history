import { createAsyncThunk } from "@reduxjs/toolkit";

export const getRecentlyClosed = createAsyncThunk(
  "tabs/getRecentlyClosed",
  async () => {
    // ! @types/chrome v0.0.193 is not updated as per manifest v3. This should return promise
    const tabs = await (chrome.sessions as any).getRecentlyClosed();
    return tabs;
  }
);

export const getDevices = createAsyncThunk("tabs/getDevices", async () => {
  // ! @types/chrome v0.0.193 is not updated as per manifest v3. This should return promise
  const deviceItems = await (chrome.sessions as any).getDevices();
  return deviceItems;
});

export const restoreSession = createAsyncThunk(
  "tabs/restoreSession",
  async (sessionId: string) => {
    // ! @types/chrome v0.0.193 is not updated as per manifest v3. This should return promise
    const restoredSession = await chrome.sessions.restore(sessionId);
    return restoredSession;
  }
);
