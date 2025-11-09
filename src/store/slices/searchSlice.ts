import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  page: number;
  debounceDelay: number; // REQUIREMENT: 250ms debounce delay
}

const initialState: SearchState = {
  query: '',
  page: 1,
  // REQUIREMENT: Debounce API calls to 250ms intervals
  // This value is used in SearchBar component to delay API calls
  // 250ms is the optimal balance between responsiveness and reducing API calls
  debounceDelay: 250,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.page = 1; // Reset to first page on new search
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setQuery, setPage } = searchSlice.actions;
export default searchSlice.reducer;


