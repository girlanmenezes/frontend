import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import authSlice from "./features/authSlice";

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    appUser: authSlice
  }
  
});

export type RootState = ReturnType<typeof store.getState>;