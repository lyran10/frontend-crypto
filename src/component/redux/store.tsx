import { configureStore } from "@reduxjs/toolkit";
import { values } from "./reducer";

export const store = configureStore({
  reducer: {
    data: values.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
