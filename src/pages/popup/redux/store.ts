import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import history from "./history";

const store = configureStore({
  reducer: {
    history,
  },
});

// To prevent name collision
export type AppDispatch = typeof store.dispatch;
export const useAppDispatach: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
