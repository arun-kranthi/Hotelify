import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const ThemeContext = createContext();

// Create a custom hook to use the context
export const useTheme = () => useContext(ThemeContext);

// Create the provider component
export const ThemeProvider = ({ children }) => {
  // State to hold the current theme
  const [theme, setTheme] = useState('light');

  // Effect to update the <html> tag whenever the theme changes
  useEffect(() => {
    // Get the root <html> element
    const root = document.documentElement;
    
    // Set the data-bs-theme attribute
    root.setAttribute('data-bs-theme', theme);
  }, [theme]); // This effect runs every time 'theme' changes

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Value to be provided by the context
  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};