import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import settings from "../../../common/redux/settings/settings-slice";
import saveStorage from "./middleware/save-chrome-storage";

const store = configureStore({
  reducer: { settings },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveStorage),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatach: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
