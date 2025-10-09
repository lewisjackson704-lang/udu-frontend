import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Sun, Moon } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

/**
 * ThemeToggle — switches between light/dark modes globally.
 * Uses ThemeContext for state management.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleToggle = () => {
    try {
      toggleTheme();
    } catch (error) {
      console.error("Failed to toggle theme:", error);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 rounded-xl border border-amber-400 bg-amber-400/10 px-3 py-1.5 text-sm font-semibold text-amber-600 transition hover:bg-amber-400/20 dark:text-amber-300"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

ThemeToggle.propTypes = {
  // The `ThemeContext` is expected to provide `theme` and `toggleTheme`.
  theme: PropTypes.oneOf(["dark", "light"]),
  toggleTheme: PropTypes.func,
};
