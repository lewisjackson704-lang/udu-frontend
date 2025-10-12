/**
 * Centralized Application Limits
 * These constants define global restrictions for various app features.
 */
export const LIMITS = {
  UPLOAD: {
    MAX_SIZE_MB: 500, // Maximum file upload size in MB
  },
  VIDEO: {
    MAX_LENGTH_MINUTES: 180, // Maximum video length in minutes
  },
  COMMENT: {
    MAX_LENGTH: 500, // Maximum comment length in characters
  },
  LIVE: {
    MAX_VIEWERS_DISPLAY: 10000, // Maximum live viewers displayed
  },
  DEFAULTS: {
    PAGINATION_LIMIT: 50, // Default pagination limit for lists
    RETRY_ATTEMPTS: 3, // Default number of retry attempts for any operation
  },
};
