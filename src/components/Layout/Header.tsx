import React, { useEffect } from 'react';
import { Search, Menu, Sun, Moon, Grid3X3, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


interface HeaderProps {
  onMenuClick: () => void;
  width: number; // Optional prop for width, if needed
  setIsDarkMode: (isDark: boolean) => void; // Function to set dark mode state
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, width, setIsDarkMode }) => {
  const { isDark, toggleTheme } = useTheme();
  const [openSearch, setOpenSearch] = React.useState(false);
  useEffect(() => {
    // Update the dark mode state when the component mounts
    setIsDarkMode(isDark);
  }, [isDark]);

  // press CTRl + / for search
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === '/' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setOpenSearch(!openSearch);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [openSearch]);
  return (
    <header className="sticky top-0 left-0 right-0 bg-white dark:bg-dark border-b border-gray-200 dark:border-gray-700 px-4 md:px-5 py-3 z-[800] shadow-md rounded-md overflow-hidden">
      <div className="flex items-center justify-between">
        {
          openSearch && <div className="absolute dark:bg-dark bg-white w-full h-full left-0 top-0 z-50">
            <input
              type="text"
              autoFocus
              placeholder='Search Anything...'
              className='h-full w-full px-5 text-white text-sm bg-transparent'
            />
            <button
              onClick={() => setOpenSearch(false)}
              className='text-white absolute right-4 top-1/2 transform -translate-y-1/2'>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        }
        <div className="flex items-center space-x-4 flex-1">
          {/* Mobile Menu Button */}
          {
            width < 1200 && <button
              onClick={onMenuClick}
              className=" text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <Menu size={20} />
            </button>
          }

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search
              onClick={() => setOpenSearch(!openSearch)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Grid Icon */}
          <button
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Grid view"
          >
            <Grid3X3 size={20} />
          </button>

          {/* User Avatar */}
          <button
            className="w-9 h-9 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            title="User menu"
          >
            <User size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;