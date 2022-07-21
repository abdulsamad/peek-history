import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import settings from "./settings/settings-slice";

const store = configureStore({
  reducer: {
    settings,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatach: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
