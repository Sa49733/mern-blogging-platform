import { useTheme } from "../context/ThemeContext";

function ThemeToggle({ className = "" }) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      aria-label="Toggle theme"
      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0
        bg-black/5 hover:bg-black/10 text-slate-700
        dark:bg-white/5 dark:hover:bg-white/10 dark:text-[#E8EAF0]
        border border-black/5 dark:border-white/10 transition-colors ${className}`}
    >
      {darkMode ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8L6 18M18 6l1.8-1.8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 14.5A8.5 8.5 0 1110 3.5a7 7 0 0010 11z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

export default ThemeToggle;