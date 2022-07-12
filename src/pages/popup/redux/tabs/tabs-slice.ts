import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getRecentlyClosed, getDevices } from "./thunks";

interface ITabSession {
  lastModified: number;
  tab: ITabItem;
  window: never;
}

interface IWindowSession {
  lastModified: number;
  tab: never;
  window: IWindowItem;
}

export type ISession = ITabSession | IWindowSession;

export interface IWindowItem {
  alwaysOnTop: boolean;
  focused: boolean;
  incognito: boolean;
  sessionId: string;
  state: string;
  tabs: ITabItem[];
  type: string;
}

export interface ITabItem {
  active: boolean;
  autoDiscardable: boolean;
  discarded: boolean;
  favIconUrl: string;
  groupId: number;
  highlighted: boolean;
  incognito: boolean;
  index: number;
  pinned: boolean;
  selected: boolean;
  sessionId: string;
  title: string;
  url: string;
  windowId: number;
}

export interface IDevice {
  deviceName: string;
  sessions: ISession[];
}

interface tabsState {
  recent: ISession[];
  other: IDevice[];
}

const initialState: tabsState = {
  recent: [],
  other: [],
};

const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    filter(state, { payload }: PayloadAction<string>) {
      const regex = new RegExp(payload, "gi");

      // Return when payload is empty
      if (payload === "") return;

      const filteredRecentsTabs = state.recent.filter(({ tab, window }) => {
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
      });

      const filteredOtherTabs = state.other.filter(({ sessions }) => {
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

      state.recent = filteredRecentsTabs;
      state.other = filteredOtherTabs;
    },
  },
  extraReducers: (builder) => {
    // Recently Closed Tabs
    builder.addCase(
      getRecentlyClosed.fulfilled,
      (state, { payload }: PayloadAction<ISession[]>) => {
        state.recent = payload;
      }
    ),
      // Tabs from other Devices
      builder.addCase(
        getDevices.fulfilled,
        (state, { payload }: PayloadAction<IDevice[]>) => {
          state.other = payload;
        }
      );
  },
});

export const { filter } = tabsSlice.actions;
export default tabsSlice.reducer;
