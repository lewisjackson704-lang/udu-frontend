import React, { createContext, useState, useEffect, useContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      // Check for saved theme in localStorage
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme;

      // Fallback to system preference if no saved theme exists
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    } catch (err) {
      console.error("Error initializing theme:", err);
      return "light"; // Default to light theme in case of error
    }
  });

  useEffect(() => {
    try {
      // Apply the theme to the HTML root element
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);

      // Persist theme in localStorage
      localStorage.setItem("theme", theme);

      // Notify other parts of the app about the theme change (optional)
      window.dispatchEvent(new CustomEvent("theme-change", { detail: theme }));
    } catch (err) {
      console.error("Error applying theme:", err);
    }
  }, [theme]);

  /**
   * Toggles between light and dark themes.
   */
  const toggleTheme = () => {
    try {
      setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    } catch (err) {
      console.error("Error toggling theme:", err);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook for consuming the ThemeContext.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
