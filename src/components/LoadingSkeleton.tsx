const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="glass-effect rounded-xl overflow-hidden animate-pulse-slow"
        >
          <div className="h-64 bg-gray-700/50" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-700/50 rounded w-3/4" />
            <div className="h-3 bg-gray-700/50 rounded w-1/2" />
            <div className="flex gap-2">
              <div className="h-6 bg-gray-700/50 rounded-full w-16" />
              <div className="h-6 bg-gray-700/50 rounded-full w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;


