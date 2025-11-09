import { useNavigate } from 'react-router-dom';
import { Anime } from '../types/anime';

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/anime/${anime.mal_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="glass-effect rounded-xl overflow-hidden cursor-pointer card-hover group animate-fade-in"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
          alt={anime.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {anime.score && (
          <div className="absolute top-2 right-2 bg-purple-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
            <span>⭐</span>
            <span>{anime.score.toFixed(1)}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
          {anime.title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {anime.genres.slice(0, 3).map((genre) => (
            <span
              key={genre.mal_id}
              className="px-2 py-1 bg-purple-600/30 text-purple-200 text-xs rounded-full"
            >
              {genre.name}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-300">
          <span>{anime.type}</span>
          {anime.episodes && <span>{anime.episodes} eps</span>}
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;


