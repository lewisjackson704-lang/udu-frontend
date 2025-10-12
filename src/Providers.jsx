import React from "react";
import PropTypes from "prop-types";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { UIProvider } from "@/context/UIContext";

/**
 * Centralized Providers Component
 * Wraps the app with all necessary context providers.
 *
 * @param {React.ReactNode} children - The child components to be wrapped by the providers.
 * @returns {JSX.Element} - The wrapped provider component tree.
 */
export const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <UIProvider>{children}</UIProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

// Prop type validation
Providers.propTypes = {
  children: PropTypes.node.isRequired, // Ensures children are provided
};

export default Providers;
