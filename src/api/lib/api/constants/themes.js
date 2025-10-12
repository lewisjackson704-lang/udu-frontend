/**
 * Centralized Theme Configuration
 * Defines light and dark theme settings for consistent styling across the application.
 */
export const THEMES = Object.freeze({
  LIGHT: {
    name: "light", // Name of the theme
    colors: {
      primary: "#FFD600",    // Highlight or accent color
      background: "#FFFFFF", // Background color
      text: "#000000",        // Text color
    },
  },
  DARK: {
    name: "dark", // Name of the theme
    colors: {
      primary: "#FFD600",    // Highlight or accent color
      background: "#000000", // Background color
      text: "#FFFFFF",        // Text color
    },
  },
  DEFAULT: "LIGHT", // Default theme to use if none is specified
});
