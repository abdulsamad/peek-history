import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import history from "./history/history-slice";
import tabs from "./tabs/tabs-slice";
import ui from "./ui/ui-slice";
import settings from "@src/common/redux/settings/settings-slice";

const store = configureStore({
  reducer: {
    history,
    tabs,
    ui,
    settings,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatach: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
