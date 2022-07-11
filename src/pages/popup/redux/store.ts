import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import history from "./history/history-slice";
import { getHistory } from "./history/thunks";
import tabs from "./tabs/tabs-slice";
import { getRecentlyClosed, getDevices } from "./tabs/thunks";
import ui from "./ui/ui-slice";

const store = configureStore({
  reducer: {
    history,
    tabs,
    ui,
  },
});

// Load inital {History, Recently Closed Tabs, Tabs from other devices}
store.dispatch(getHistory({}));
store.dispatch(getRecentlyClosed());
store.dispatch(getDevices());

export type AppDispatch = typeof store.dispatch;
export const useAppDispatach: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
