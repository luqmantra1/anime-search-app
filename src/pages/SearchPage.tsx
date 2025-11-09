import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { searchAnime } from '../store/slices/animeSlice';
import SearchBar from '../components/SearchBar';
import AnimeCard from '../components/AnimeCard';
import Pagination from '../components/Pagination';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

const SearchPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading, error, pagination } = useSelector(
    (state: RootState) => state.anime
  );
  const { query } = useSelector((state: RootState) => state.search);

  const handleRetry = () => {
    if (query) {
      dispatch(searchAnime({ query, page: 1 }));
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            Anime Search
          </h1>
          <p className="text-gray-300 text-lg">
            Discover your next favorite anime
          </p>
        </div>

        <SearchBar />

        {loading && <LoadingSkeleton />}

        {error && !loading && <ErrorMessage message={error} onRetry={handleRetry} />}

        {!loading && !error && query && searchResults.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-8xl mb-6">🔍</div>
            <h2 className="text-3xl font-bold gradient-text mb-4">No Results Found</h2>
            <p className="text-gray-300 text-lg max-w-md mx-auto">
              We couldn't find any anime matching "{query}". Try searching with different keywords.
            </p>
          </div>
        )}

        {!loading && !error && searchResults.length > 0 && (
          <>
            {pagination && (
              <div className="text-center mb-6 text-gray-300">
                Found {pagination.total.toLocaleString()} results
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {searchResults.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}
            </div>
            <Pagination />
          </>
        )}

        {!loading && !error && !query && <EmptyState />}
      </div>
    </div>
  );
};

export default SearchPage;


