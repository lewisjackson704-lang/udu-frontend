/**
 * Centralized API Configuration
 * This file contains the base API URL and endpoint definitions for the application.
 */

// Validate `import.meta.env.VITE_API_URL` existence
const isValidURL = (url) => {
  try {
    new URL(url); // Throws an error if the URL is invalid
    return true;
  } catch {
    return false;
  }
};

// Fallback to a secure default production URL if `VITE_API_URL` is not defined or invalid
const BASE_URL = isValidURL(import.meta.env.VITE_API_URL)
  ? import.meta.env.VITE_API_URL
  : "https://yudux-backend.onrender.com/api";

/**
 * API Endpoints
 * Define all API endpoints here to centralize their management.
 */
export const ENDPOINTS = Object.freeze({
  AUTH: `${BASE_URL}/auth`,          // Authentication-related endpoints
  USERS: `${BASE_URL}/users`,        // User management endpoints
  VIDEOS: `${BASE_URL}/videos`,      // Video-related operations
  STREAMS: `${BASE_URL}/streams`,    // Live streaming-related operations
  COMMENTS: `${BASE_URL}/comments`,  // Comment-related operations
  FANS: `${BASE_URL}/fans`,          // Fan-related features
  ANALYTICS: `${BASE_URL}/analytics` // Analytics and reporting
});

// Ensure the configuration is read-only to prevent accidental modifications
Object.freeze(BASE_URL);
