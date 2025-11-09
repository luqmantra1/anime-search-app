import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { getAnimeById, clearCurrentAnime } from '../store/slices/animeSlice';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorMessage from './ErrorMessage';

const AnimeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { currentAnime, detailLoading, detailError } = useSelector(
    (state: RootState) => state.anime
  );

  useEffect(() => {
    if (id) {
      dispatch(getAnimeById(parseInt(id)));
    }

    return () => {
      dispatch(clearCurrentAnime());
    };
  }, [id, dispatch]);

  if (detailLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSkeleton />
      </div>
    );
  }

  if (detailError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          message={detailError}
          onRetry={() => id && dispatch(getAnimeById(parseInt(id)))}
        />
      </div>
    );
  }

  if (!currentAnime) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message="Anime not found" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-white hover:text-purple-300 transition-colors"
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Search
      </button>

      <div className="glass-effect rounded-2xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={currentAnime.images.jpg.large_image_url || currentAnime.images.jpg.image_url}
              alt={currentAnime.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=No+Image';
              }}
            />
          </div>
          <div className="md:w-2/3 p-8">
            <h1 className="text-4xl font-bold text-white mb-4">{currentAnime.title}</h1>
            {currentAnime.title_english && (
              <h2 className="text-2xl text-gray-300 mb-4">{currentAnime.title_english}</h2>
            )}
            {currentAnime.title_japanese && (
              <p className="text-lg text-gray-400 mb-6">{currentAnime.title_japanese}</p>
            )}

            <div className="flex flex-wrap gap-4 mb-6">
              {currentAnime.score && (
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span className="text-xl font-bold text-white">{currentAnime.score.toFixed(1)}</span>
                  <span className="text-gray-400">({currentAnime.scored_by?.toLocaleString()} votes)</span>
                </div>
              )}
              {currentAnime.rank && (
                <div className="text-gray-300">
                  Rank: <span className="text-white font-bold">#{currentAnime.rank}</span>
                </div>
              )}
              {currentAnime.popularity && (
                <div className="text-gray-300">
                  Popularity: <span className="text-white font-bold">#{currentAnime.popularity}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {currentAnime.genres.map((genre) => (
                <span
                  key={genre.mal_id}
                  className="px-3 py-1 bg-purple-600/30 text-purple-200 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
              <div>
                <span className="text-gray-400">Type:</span>
                <p className="text-white font-semibold">{currentAnime.type}</p>
              </div>
              {currentAnime.episodes && (
                <div>
                  <span className="text-gray-400">Episodes:</span>
                  <p className="text-white font-semibold">{currentAnime.episodes}</p>
                </div>
              )}
              <div>
                <span className="text-gray-400">Status:</span>
                <p className="text-white font-semibold">{currentAnime.status}</p>
              </div>
              <div>
                <span className="text-gray-400">Duration:</span>
                <p className="text-white font-semibold">{currentAnime.duration}</p>
              </div>
              {currentAnime.year && (
                <div>
                  <span className="text-gray-400">Year:</span>
                  <p className="text-white font-semibold">{currentAnime.year}</p>
                </div>
              )}
              {currentAnime.season && (
                <div>
                  <span className="text-gray-400">Season:</span>
                  <p className="text-white font-semibold">{currentAnime.season}</p>
                </div>
              )}
              <div>
                <span className="text-gray-400">Rating:</span>
                <p className="text-white font-semibold">{currentAnime.rating}</p>
              </div>
              <div>
                <span className="text-gray-400">Source:</span>
                <p className="text-white font-semibold">{currentAnime.source}</p>
              </div>
            </div>

            {currentAnime.studios.length > 0 && (
              <div className="mb-6">
                <span className="text-gray-400">Studios: </span>
                <span className="text-white">
                  {currentAnime.studios.map((s) => s.name).join(', ')}
                </span>
              </div>
            )}

            {currentAnime.synopsis && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-3">Synopsis</h3>
                <p className="text-gray-300 leading-relaxed">{currentAnime.synopsis}</p>
              </div>
            )}

            {currentAnime.trailer?.embed_url && (
              <div className="mt-6">
                <h3 className="text-xl font-bold text-white mb-3">Trailer</h3>
                <div className="aspect-video">
                  <iframe
                    src={currentAnime.trailer.embed_url}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;


