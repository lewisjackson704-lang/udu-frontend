import apiClient from "./apiClient.js";

/**
 * Fetch trending videos with optional query parameters (e.g., pagination, filters)
 * @param {Object} params - Query parameters (optional)
 * @returns {Promise<Object>}
 */
export const fetchTrendingVideos = async (params = {}) => {
  try {
    const response = await apiClient.get("/videos/trending", { params });
    return response;
  } catch (error) {
    console.error("Error fetching trending videos:", error);
    throw error; // Rethrow to handle in the calling function
  }
};

/**
 * Fetch explore content with optional query parameters
 * @param {Object} params - Query parameters (optional)
 * @returns {Promise<Object>}
 */
export const fetchExploreContent = async (params = {}) => {
  try {
    const response = await apiClient.get("/videos/explore", { params });
    return response;
  } catch (error) {
    console.error("Error fetching explore content:", error);
    throw error;
  }
};

/**
 * Get a single video by ID
 * @param {string} id - Video ID
 * @returns {Promise<Object>}
 */
export const fetchVideoById = async (id) => {
  if (!id) {
    throw new Error("Video ID is required to fetch a video.");
  }

  try {
    const response = await apiClient.get(`/videos/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching video with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Get related videos by video ID
 * @param {string} id - Video ID
 * @returns {Promise<Object>}
 */
export const fetchRelatedVideos = async (id) => {
  if (!id) {
    throw new Error("Video ID is required to fetch related videos.");
  }

  try {
    const response = await apiClient.get(`/videos/related/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching related videos for ID ${id}:`, error);
    throw error;
  }
};

/**
 * Upload a video
 * @param {Object} formData - Form data containing the video file and metadata
 * @returns {Promise<Object>}
 */
export const uploadVideo = async (formData) => {
  if (!formData || !(formData instanceof FormData)) {
    throw new Error("Invalid form data provided for video upload.");
  }

  try {
    const response = await apiClient.post("/videos/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
};

/**
 * Like or unlike a video by ID
 * @param {string} id - Video ID
 * @returns {Promise<Object>}
 */
export const toggleLikeVideo = async (id) => {
  if (!id) {
    throw new Error("Video ID is required to like or unlike a video.");
  }

  try {
    const response = await apiClient.post(`/videos/${id}/like`);
    return response;
  } catch (error) {
    console.error(`Error toggling like for video with ID ${id}:`, error);
    throw error;
  }
};
