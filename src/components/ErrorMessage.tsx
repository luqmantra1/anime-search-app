interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="glass-effect rounded-xl p-8 text-center max-w-md mx-auto animate-fade-in">
      <div className="text-6xl mb-4">😞</div>
      <h3 className="text-xl font-bold text-white mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-300 mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;


