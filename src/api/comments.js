// src/api/comments.js
// Unified Comments + Engagement API for U·DU
// Supports videos, streams, and fan posts

const API_BASE = import.meta.env.VITE_API_URL;

/**
 * Helper function to handle responses
 */
async function handleResponse(res) {
  if (!res.ok) {
    const errorMessage = `API Error (${res.status}): ${await res.text()}`;
    throw new Error(errorMessage);
  }
  return res.json();
}

/**
 * Centralized API request handler
 * @param {string} endpoint - Relative API endpoint
 * @param {Object} options - Fetch options (method, headers, body, etc.)
 */
async function apiRequest(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      credentials: "include", // Ensures authentication in global contexts
    });
    return await handleResponse(res);
  } catch (err) {
    console.error(`Error in API request to ${endpoint}:`, err);
    throw err; // Re-throw for further handling
  }
}

/**
 * ===========================
 * FETCH COMMENTS
 * ===========================
 */

/**
 * Get all comments for a video, stream, or post
 * @param {string} targetId - ID of the content (videoId, streamId, etc.)
 * @param {string} type - "video" | "stream" | "post"
 * @param {Object} options - { page, limit }
 */
export const fetchComments = async (targetId, type = "video", options = {}) => {
  const query = new URLSearchParams(options).toString();
  return apiRequest(`/api/comments/${type}/${targetId}?${query}`, { method: "GET" });
};

/**
 * Get replies for a specific comment
 * @param {string} commentId
 * @param {Object} options - { page, limit }
 */
export const fetchReplies = async (commentId, options = {}) => {
  const query = new URLSearchParams(options).toString();
  return apiRequest(`/api/comments/replies/${commentId}?${query}`, { method: "GET" });
};

/**
 * ===========================
 * CREATE / REPLY
 * ===========================
 */

/**
 * Add a new comment
 * @param {string} targetId
 * @param {Object} payload - { text, type }
 */
export const createComment = async (targetId, payload) => {
  return apiRequest(`/api/comments/${targetId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

/**
 * Add a reply to an existing comment
 * @param {string} commentId
 * @param {Object} payload - { text }
 */
export const createReply = async (commentId, payload) => {
  return apiRequest(`/api/comments/reply/${commentId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

/**
 * ===========================
 * REACTIONS / LIKE / HEART
 * ===========================
 */

/**
 * Toggle like on a comment
 * @param {string} commentId
 */
export const toggleLikeComment = async (commentId) => {
  return apiRequest(`/api/comments/${commentId}/like`, { method: "POST" });
};

/**
 * ===========================
 * DELETE / MODERATION
 * ===========================
 */

/**
 * Delete a comment (for author or admin)
 * @param {string} commentId
 */
export const deleteComment = async (commentId) => {
  return apiRequest(`/api/comments/${commentId}`, { method: "DELETE" });
};

/**
 * ===========================
 * SAFE WRAPPER
 * ===========================
 */

/**
 * Wrapper for API calls with safe error handling
 * @param {Function} fn - The API function to call
 * @param {...any} args - Arguments for the API function
 * @returns {Promise<any>} - Returns API response or null on error
 */
export async function safeCall(fn, ...args) {
  try {
    return await fn(...args);
  } catch (err) {
    console.error("Comment API Error:", err.message);
    return null; // Return null for safer usage in components
  }
}
