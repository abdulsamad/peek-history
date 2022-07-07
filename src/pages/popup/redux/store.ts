import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { historyReducer, tabsReducer } from "./reducers";

const store = configureStore({
  reducer: {
    history: historyReducer,
    tabs: tabsReducer,
  },
});

// To prevent name collision
export type AppDispatch = typeof store.dispatch;
export const useAppDispatach: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
