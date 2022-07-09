import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import history from "./history/history-slice";
import { getHistory } from "./history/thunks";

const store = configureStore({
  reducer: {
    history,
  },
});

// Load inital history
store.dispatch(getHistory({}));

export type AppDispatch = typeof store.dispatch;
export const useAppDispatach: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
