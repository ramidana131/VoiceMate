import Header from './components/Header';
import MainCard from './components/MainCard';
import Footer from './components/Footer';
import useDarkMode from './hooks/useDarkMode';

export default function App() {
  const [theme, setTheme] = useDarkMode();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-all duration-500 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white'
          : 'bg-gradient-to-br from-blue-100 to-purple-200 text-gray-900'
      }`}
    >
      {/* Pass toggle function and current theme to Header */}
      <Header toggleTheme={toggleTheme} theme={theme} />
      
      <main className="flex-grow flex justify-center items-center px-4 py-10">
        <MainCard theme={theme} />
      </main>
      
      <Footer />
    </div>
  );
}
