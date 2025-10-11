import apiClient from "./apiClient.js";

/**
 * Fetch all active streams with optional query parameters (e.g., pagination, filters)
 * @param {Object} params - Query parameters (optional)
 * @returns {Promise<Object>}
 */
export const fetchActiveStreams = async (params = {}) => {
  try {
    const response = await apiClient.get("/streams/active", { params });
    return response;
  } catch (error) {
    console.error("Error fetching active streams:", error);
    throw error; // Rethrow to handle in the calling function
  }
};

/**
 * Fetch a specific stream by ID
 * @param {string} id - Stream ID
 * @returns {Promise<Object>}
 */
export const fetchStreamById = async (id) => {
  if (!id) {
    throw new Error("Stream ID is required to fetch a stream.");
  }

  try {
    const response = await apiClient.get(`/streams/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching stream with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Start a new live stream
 * @param {Object} data - Stream data (e.g., title, description, etc.)
 * @returns {Promise<Object>}
 */
export const startStream = async (data) => {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid data provided for starting a stream.");
  }

  try {
    const response = await apiClient.post("/streams/start", data);
    return response;
  } catch (error) {
    console.error("Error starting a new stream:", error);
    throw error;
  }
};

/**
 * End a live stream by ID
 * @param {string} id - Stream ID
 * @returns {Promise<Object>}
 */
export const endStream = async (id) => {
  if (!id) {
    throw new Error("Stream ID is required to end a stream.");
  }

  try {
    const response = await apiClient.post(`/streams/${id}/end`);
    return response;
  } catch (error) {
    console.error(`Error ending stream with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch past streams of a specific user
 * @param {string} userId - User ID
 * @param {Object} params - Query parameters (optional)
 * @returns {Promise<Object>}
 */
export const fetchUserStreams = async (userId, params = {}) => {
  if (!userId) {
    throw new Error("User ID is required to fetch past streams.");
  }

  try {
    const response = await apiClient.get(`/streams/user/${userId}`, { params });
    return response;
  } catch (error) {
    console.error(`Error fetching streams for user with ID ${userId}:`, error);
    throw error;
  }
};
