import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Anime, AnimeSearchResponse, AnimeDetailResponse } from '../../types/anime';
import { apiService } from '../../services/api';

interface AnimeState {
  searchResults: Anime[];
  currentAnime: Anime | null;
  loading: boolean;
  error: string | null;
  pagination: {
    lastVisiblePage: number;
    hasNextPage: boolean;
    currentPage: number;
    total: number;
  } | null;
  detailLoading: boolean;
  detailError: string | null;
}

const initialState: AnimeState = {
  searchResults: [],
  currentAnime: null,
  loading: false,
  error: null,
  pagination: null,
  detailLoading: false,
  detailError: null,
};

export const searchAnime = createAsyncThunk(
  'anime/search',
  async ({ query, page }: { query: string; page: number }, { rejectWithValue }) => {
    try {
      const response: AnimeSearchResponse = await apiService.searchAnime(query, page);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'Request cancelled') {
        return rejectWithValue('Request cancelled');
      }
      return rejectWithValue('Failed to search anime. Please try again.');
    }
  }
);

export const getAnimeById = createAsyncThunk(
  'anime/getById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response: AnimeDetailResponse = await apiService.getAnimeById(id);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue('Failed to load anime details. Please try again.');
    }
  }
);

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.pagination = null;
      state.error = null;
    },
    clearCurrentAnime: (state) => {
      state.currentAnime = null;
      state.detailError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search anime
      .addCase(searchAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAnime.fulfilled, (state, action: PayloadAction<AnimeSearchResponse>) => {
        state.loading = false;
        state.searchResults = action.payload.data;
        state.pagination = {
          lastVisiblePage: action.payload.pagination.last_visible_page,
          hasNextPage: action.payload.pagination.has_next_page,
          currentPage: action.payload.pagination.current_page,
          total: action.payload.pagination.items.total,
        };
        state.error = null;
      })
      .addCase(searchAnime.rejected, (state, action) => {
        state.loading = false;
        if (action.payload !== 'Request cancelled') {
          state.error = action.payload as string;
        }
      })
      // Get anime by ID
      .addCase(getAnimeById.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(getAnimeById.fulfilled, (state, action: PayloadAction<Anime>) => {
        state.detailLoading = false;
        state.currentAnime = action.payload;
        state.detailError = null;
      })
      .addCase(getAnimeById.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError = action.payload as string;
      });
  },
});

export const { clearSearchResults, clearCurrentAnime } = animeSlice.actions;
export default animeSlice.reducer;


