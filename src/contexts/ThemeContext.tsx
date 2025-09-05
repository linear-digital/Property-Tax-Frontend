import React, { createContext, useContext, useState, useEffect } from 'react';
import { branches } from '../config/settings';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  branch: {
    name: string;
    code: string;
    title: string;
    description: string;
    state: string;
    logo: string;
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // Default to dark
  });
  const [branch, setBranch] = useState(branches[0]);
  useEffect(() => {
  const host = window.location.hostname; // e.g. "afgoye.swstaxpropertypro.com"
  const subdomain = host.split(".")[0];  // "afgoye"
  
  const matchedBranch = branches.find(
    (b) => b.name.toLowerCase().includes(subdomain.toLowerCase())
  ) || branches[1];
  
  setBranch(matchedBranch);
}, []);
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, branch }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
