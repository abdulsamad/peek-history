import { createAsyncThunk } from "@reduxjs/toolkit";

import { IDevice, ISession, ITabItem } from "./tabs-slice";

export const getRecentlyClosed = createAsyncThunk(
  "tabs/getRecentlyClosed",
  async () => {
    const tabs = await (chrome.sessions as any).getRecentlyClosed();
    return tabs;
  }
);

export const getDevices = createAsyncThunk("tabs/getDevices", async () => {
  const deviceItems = await (chrome.sessions as any).getDevices();
  return deviceItems;
});

export const restoreSession = createAsyncThunk(
  "tabs/restoreSession",
  async (sessionId: string) => {
    const restoredSession = await (chrome.sessions as any).restore(sessionId);
    return restoredSession;
  }
);

export const filter = createAsyncThunk(
  "tabs/filter",
  async (keyword: string) => {
    // Plain text match, the keyword is not a pattern
    const query = keyword.toLowerCase();
    const matches = ({ title, url }: ITabItem) =>
      [title, url].some((value) => value?.toLowerCase().includes(query));

    const recentlyClosedTabs: ISession[] = await (
      chrome.sessions as any
    ).getRecentlyClosed();
    const otherTabs: IDevice[] = await (chrome.sessions as any).getDevices();

    const filteredRecentsTabs = recentlyClosedTabs.filter(({ tab, window }) => {
      if (tab) return matches(tab);

      //  Window
      if (!window) return false;

      window.tabs = window.tabs.filter(matches);
      return window.tabs.length > 0;
    });

    const filteredOtherTabs = otherTabs.filter((device) => {
      // Tabs on windows
      device.sessions = device.sessions.filter(({ window }) => {
        window.tabs = window.tabs.filter(matches);
        return window.tabs.length > 0;
      });

      return device.sessions.length > 0;
    });

    return {
      recent: filteredRecentsTabs,
      other: filteredOtherTabs,
    };
  }
);
