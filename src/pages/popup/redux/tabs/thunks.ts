import { createAsyncThunk } from "@reduxjs/toolkit";

import { IDevice, ISession } from "./tabs-slice";
import { openAllTabsAccordions } from "../../hooks/utils";

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
    const restoredSession = await chrome.sessions.restore(sessionId);
    return restoredSession;
  }
);

export const filter = createAsyncThunk(
  "tabs/filter",
  async (keyword: string) => {
    const regex = new RegExp(keyword, "gi");

    openAllTabsAccordions();

    const recentlyClosedTabs = await (
      chrome.sessions as any
    ).getRecentlyClosed();
    const otherTabs = await (chrome.sessions as any).getDevices();

    const filteredRecentsTabs = recentlyClosedTabs.filter(
      ({ tab, window }: ISession) => {
        if (tab && (regex.test(tab.title) || regex.test(tab.url))) {
          return true;
        }

        //  Window
        if (!window) return false;

        const filteredWindow = window.tabs.filter(
          (tab) => regex.test(tab.title) || regex.test(tab.url)
        );

        if (filteredWindow.length > 0) {
          window.tabs = filteredWindow;
          return true;
        }
      }
    );

    const filteredOtherTabs = otherTabs.filter(({ sessions }: IDevice) => {
      const devices = sessions.filter((device) => {
        // Tabs on windows
        const tabs = device.window.tabs.filter(
          (tab) => regex.test(tab.title) || regex.test(tab.url)
        );

        if (tabs.length > 0) {
          device.window.tabs = tabs;
          return true;
        }
      });

      if (devices.length > 0) {
        return true;
      }
    });

    return {
      recent: filteredRecentsTabs,
      other: filteredOtherTabs,
    };
  }
);
