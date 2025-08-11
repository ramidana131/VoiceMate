import { FiSun, FiMoon } from 'react-icons/fi';
import useDarkMode from '../hooks/useDarkMode';

export default function ThemeToggle() {
  const [theme, setTheme] = useDarkMode();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-2xl transition-transform duration-300 hover:scale-110"
    >
      {theme === 'dark' ? (
        <FiSun className="text-yellow-400" />
      ) : (
        <FiMoon className="text-blue-400" />
      )}
    </button>
  );
}
