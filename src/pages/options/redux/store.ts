import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import settings from "./settings/settings-slice";
import saveChromeStorage from "./middleware/save-chrome-storage";

const store = configureStore({
  reducer: { settings },
  middleware: [saveChromeStorage],
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatach: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
