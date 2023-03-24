import { configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { rootReducer } from "@/state/root-reducer";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type StoreType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<StoreType> = useReduxSelector; // by default add the state type for every selector
export const useDispatch = () => useReduxDispatch<AppDispatch>();  // by default use the dispatch types for every hook used in the app.

