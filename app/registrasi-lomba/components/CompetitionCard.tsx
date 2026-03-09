interface CompetitionCardProps {
  name: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function CompetitionCard({
  name,
  color,
  isSelected,
  onClick,
}: CompetitionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full text-left rounded-2xl border-2 px-6 py-5 transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isSelected
          ? `${color} border-current shadow-lg scale-[1.02]`
          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500"
      }`}
    >
      <span
        className={`text-lg font-bold ${
          isSelected ? "text-white" : "text-gray-900 dark:text-white"
        }`}
      >
        {name}
      </span>

      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
    </button>
  );
}
