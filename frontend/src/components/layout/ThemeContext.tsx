'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const DashboardThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname() || '';
  const isDashboardRoute = 
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/family') ||
    pathname.startsWith('/pay') ||
    pathname.startsWith('/projects') ||
    pathname.startsWith('/settings');

  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    // Only load saved theme for dashboard pages
    const saved = localStorage.getItem('verapay_dashboard_theme') as Theme | null;
    if (saved === 'dark' || saved === 'light') {
      setThemeState(saved);
    }
  }, []);

  useEffect(() => {
    if (!isDashboardRoute) {
      // Landing page MUST remain strictly untouched (no dark/light class override)
      document.documentElement.classList.remove('dark');
      document.documentElement.removeAttribute('data-theme');
      return;
    }

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }

    return () => {
      // Cleanup when navigating away from dashboard
      if (!window.location.pathname.startsWith('/dashboard') &&
          !window.location.pathname.startsWith('/family') &&
          !window.location.pathname.startsWith('/pay') &&
          !window.location.pathname.startsWith('/projects') &&
          !window.location.pathname.startsWith('/settings')) {
        document.documentElement.classList.remove('dark');
        document.documentElement.removeAttribute('data-theme');
      }
    };
  }, [theme, isDashboardRoute]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('verapay_dashboard_theme', newTheme);
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <div className={`min-h-screen transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-[#070B12] text-slate-100' 
          : 'bg-[#F8FAFC] text-slate-900'
      }`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
