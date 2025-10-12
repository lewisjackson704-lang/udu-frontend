/**
 * Centralized API Error Handler
 * Handles errors from API requests and ensures consistent error responses throughout the application.
 *
 * @param {Object} error - The error object from the API response.
 * @returns {Object} - A standardized error response object.
 */
export const handleApiError = (error) => {
  // Extract useful error information
  const statusCode = error?.response?.status || 500; // Default to 500 for server errors
  const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
  const errorDetails = error?.response?.data?.details || null; // Additional details (if available)

  // Log the error securely
  if (process.env.NODE_ENV !== "production") {
    console.error("API Error:", {
      statusCode,
      message: errorMessage,
      stack: error?.stack || "No stack trace available",
    });
  } else {
    console.error("API Error:", { statusCode, message: errorMessage });
  }

  // Return a standardized error response
  return {
    success: false,
    statusCode, // Include HTTP status code for debugging
    message: errorMessage, // User-friendly error message
    details: errorDetails, // Additional error details (optional)
  };
};
