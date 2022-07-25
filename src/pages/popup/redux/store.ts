import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import history from "./history/history-slice";
import tabs from "./tabs/tabs-slice";
import ui from "./ui/ui-slice";

const store = configureStore({
  reducer: {
    history,
    tabs,
    ui,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatach: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
