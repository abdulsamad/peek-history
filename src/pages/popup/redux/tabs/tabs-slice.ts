import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getRecentlyClosed, getDevices, restoreSession } from "./thunks";

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

interface tabsState {
  recent: ISession[];
  other: any[];
}

const initialState: tabsState = {
  recent: [],
  other: [],
};

const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Recently Closed Tabs
    builder.addCase(
      getRecentlyClosed.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.recent = payload;
      }
    ),
      // Tabs from other Devices
      builder.addCase(
        getDevices.fulfilled,
        (state, { payload }: PayloadAction<any>) => {
          state.other = payload;
        }
      );
  },
});

// export const { getRecentlyClosed } = tabsSlice.actions;
export default tabsSlice.reducer;
