import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setPage } from '../store/slices/searchSlice';
import { searchAnime } from '../store/slices/animeSlice';

const Pagination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { page, query } = useSelector((state: RootState) => state.search);
  const { pagination } = useSelector((state: RootState) => state.anime);

  if (!pagination || pagination.lastVisiblePage <= 1) {
    return null;
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.lastVisiblePage) {
      dispatch(setPage(newPage));
      dispatch(searchAnime({ query, page: newPage }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const total = pagination.lastVisiblePage;
    const current = page;

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(total);
      } else if (current >= total - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = total - 3; i <= total; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(total);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8 mb-4 flex-wrap">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 glass-effect rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
      >
        Previous
      </button>

      {getPageNumbers().map((pageNum, index) => (
        <button
          key={index}
          onClick={() => typeof pageNum === 'number' && handlePageChange(pageNum)}
          disabled={pageNum === '...'}
          className={`px-4 py-2 rounded-lg transition-colors ${
            pageNum === page
              ? 'bg-purple-600 text-white'
              : pageNum === '...'
              ? 'cursor-default'
              : 'glass-effect hover:bg-white/20'
          }`}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === pagination.lastVisiblePage}
        className="px-4 py-2 glass-effect rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;


