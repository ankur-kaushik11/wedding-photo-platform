import { createContext, useState, useEffect } from 'react';
import { THEMES, DEFAULT_THEME } from '../constants/themes';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Load from localStorage or use default
    const saved = localStorage.getItem('wedding-theme');
    return saved ? THEMES[saved.toUpperCase()] : DEFAULT_THEME;
  });

  const changeTheme = (themeKey) => {
    const newTheme = THEMES[themeKey.toUpperCase()];
    if (newTheme) {
      setCurrentTheme(newTheme);
      localStorage.setItem('wedding-theme', themeKey);
    }
  };

  useEffect(() => {
    // Update CSS custom properties when theme changes
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', currentTheme.colors.primary);
    root.style.setProperty('--theme-secondary', currentTheme.colors.secondary);
    root.style.setProperty('--theme-accent', currentTheme.colors.accent);
    root.style.setProperty('--theme-text', currentTheme.colors.text);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};
