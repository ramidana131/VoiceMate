import { FiSun, FiMoon, FiMic } from 'react-icons/fi';
import { useState, useEffect } from 'react';

export default function Header({ toggleTheme, theme }) {
  // Local state to trigger icon animation on theme change
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation briefly when theme changes
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [theme]);

  return (
    <header className="flex items-center justify-center py-3 relative">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <FiMic className="text-red-500 animate-pulse" />
        VoiceMate
      </h1>

      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 text-3xl p-2 rounded-full bg-white dark:bg-gray-700 shadow-md transition-transform hover:scale-110"
        aria-label="Toggle Dark/Light Mode"
        title="Toggle Dark/Light Mode"
      >
        {theme === 'dark' ? (
          <FiSun
            className={`text-yellow-400 transition-transform duration-500 ${
              animate ? 'rotate-180 opacity-100' : 'rotate-0 opacity-70'
            }`}
          />
        ) : (
          <FiMoon
            className={`text-blue-400 transition-transform duration-500 ${
              animate ? 'rotate-180 opacity-100' : 'rotate-0 opacity-70'
            }`}
          />
        )}
      </button>
    </header>
  );
}
