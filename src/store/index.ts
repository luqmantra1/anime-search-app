import { configureStore } from '@reduxjs/toolkit';
import animeReducer from './slices/animeSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    anime: animeReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


