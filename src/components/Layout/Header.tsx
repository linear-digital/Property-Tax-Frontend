import React from 'react';
import { Search, Menu, Sun, Moon, Grid3X3, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';


interface HeaderProps {
  onMenuClick: () => void;
  width: number; // Optional prop for width, if needed
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, width }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-3">
      <div className="flex items-center justify-between">
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search (Ctrl+/)"
              className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400 dark:focus:ring-blue-500 transition-colors"
            />
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