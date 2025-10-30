// Base API URL (Fallback to production URL if environment variable is not set)
const BASE_URL = import.meta.env.VITE_API_URL || "https://yudux-backend.onrender.com/api";

/**
 * Centralized API Endpoints
 * Ensures all API routes are managed in one place for maintainability and scalability.
 */
export const ENDPOINTS = {
  AUTH: `${BASE_URL}/auth`,          // Authentication-related endpoints
  USERS: `${BASE_URL}/users`,        // User management endpoints
  VIDEOS: `${BASE_URL}/videos`,      // Video-related operations
  STREAMS: `${BASE_URL}/streams`,    // Streaming-related operations
  COMMENTS: `${BASE_URL}/comments`,  // Comment-related operations
  FANS: `${BASE_URL}/fans`,          // Fan-related features
  ANALYTICS: `${BASE_URL}/analytics` // Analytics and reporting
};

// Utility to log unused or invalid endpoints during development
if (process.env.NODE_ENV !== "production") {
  console.log("API BASE URL:", BASE_URL);
  console.log("Defined API Endpoints:", ENDPOINTS);
}
