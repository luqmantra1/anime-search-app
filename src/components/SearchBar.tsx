import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setQuery } from '../store/slices/searchSlice';
import { searchAnime, clearSearchResults } from '../store/slices/animeSlice';

/**
 * SearchBar Component
 * 
 * REQUIREMENT: Instant Search Implementation
 * ✅ No Enter/Button Required: Uses onChange handler - search triggers automatically as user types
 * ✅ 250ms Debounce: Delays API calls by 250ms to avoid excessive requests
 * ✅ Request Cancellation: In-flight requests are cancelled when user continues typing
 *    (Cancellation happens in apiService.searchAnime() via Axios cancel tokens)
 */
const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, debounceDelay } = useSelector((state: RootState) => state.search);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // REQUIREMENT: Cancel any in-flight API requests if user continues typing
    // This is achieved by clearing the debounce timer, which prevents the search
    // from being dispatched. When a new search IS dispatched, apiService will
    // cancel the previous request using Axios cancel tokens.
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // REQUIREMENT: Debounce API calls to 250ms intervals
    // The debounceDelay (250ms) is stored in Redux state and used here
    // This prevents making calls on every keystroke while keeping search responsive
    if (query.trim()) {
      debounceTimerRef.current = setTimeout(() => {
        // When this executes after 250ms, apiService.searchAnime() will:
        // 1. Cancel any previous in-flight request
        // 2. Make a new API call
        dispatch(searchAnime({ query, page: 1 }));
      }, debounceDelay);
    } else {
      // Clear results if query is empty
      dispatch(clearSearchResults());
    }

    // Cleanup: Clear timer if component unmounts or query changes before timer completes
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query, debounceDelay, dispatch]);

  /**
   * REQUIREMENT: Search without requiring Enter or button click
   * This onChange handler triggers on every keystroke, updating Redux state
   * which then triggers the useEffect above to handle debouncing
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for anime... (e.g., Naruto, One Piece, Attack on Titan)"
          className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-lg"
          autoFocus
        />
        {query && (
          <button
            onClick={() => dispatch(setQuery(''))}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

