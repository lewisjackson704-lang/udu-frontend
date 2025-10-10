// src/api/fans.js
// Full API client for fan tiers, subscriptions, and supporter data

const API_BASE = import.meta.env.VITE_API_URL;

/**
 * Helper to handle responses
 */
async function handleResponse(res) {
  if (!res.ok) {
    const errorBody = await res.text();
    const errorMessage = `API Error (${res.status}): ${errorBody}`;
    throw new Error(errorMessage);
  }
  return res.json();
}

/**
 * Helper to perform fetch requests
 * @param {string} endpoint - API endpoint (relative to API_BASE)
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
 * =========================
 * CREATOR-SIDE ENDPOINTS
 * =========================
 */

/**
 * Fetch all fan tiers owned by the logged-in creator
 */
export const fetchFanTiers = async () => {
  return apiRequest(`/api/fans/tiers`, { method: "GET" });
};

/**
 * Create a new fan tier (for creators)
 * @param {Object} tier - { name, price, perks }
 */
export const createFanTier = async (tier) => {
  return apiRequest(`/api/fans/tiers`, {
    method: "POST",
    body: JSON.stringify(tier),
  });
};

/**
 * Update an existing fan tier
 * @param {string} id - Tier ID
 * @param {Object} updates - { name?, price?, perks? }
 */
export const updateFanTier = async (id, updates) => {
  return apiRequest(`/api/fans/tiers/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
};

/**
 * Delete a fan tier
 * @param {string} id - Tier ID
 */
export const deleteFanTier = async (id) => {
  return apiRequest(`/api/fans/tiers/${id}`, { method: "DELETE" });
};

/**
 * Fetch all supporters of a given tier
 * @param {string} tierId
 */
export const fetchSupportersByTier = async (tierId) => {
  return apiRequest(`/api/fans/tiers/${tierId}/supporters`, { method: "GET" });
};

/**
 * Fetch overall creator monetization stats (for dashboard)
 */
export const fetchCreatorStats = async () => {
  return apiRequest(`/api/fans/creator/stats`, { method: "GET" });
};

/**
 * =========================
 * FAN-SIDE ENDPOINTS
 * =========================
 */

/**
 * Get all available tiers for a creator
 * @param {string} creatorId
 */
export const fetchAvailableTiers = async (creatorId) => {
  return apiRequest(`/api/fans/${creatorId}/tiers`, { method: "GET" });
};

/**
 * Subscribe to a tier
 * @param {string} tierId
 */
export const subscribeToTier = async (tierId) => {
  return apiRequest(`/api/fans/subscribe/${tierId}`, { method: "POST" });
};

/**
 * Cancel a subscription
 * @param {string} tierId
 */
export const cancelSubscription = async (tierId) => {
  return apiRequest(`/api/fans/unsubscribe/${tierId}`, { method: "DELETE" });
};

/**
 * Get a fan’s active subscriptions
 */
export const fetchUserSubscriptions = async () => {
  return apiRequest(`/api/fans/subscriptions`, { method: "GET" });
};

/**
 * Fetch a specific creator's supporter count
 * @param {string} creatorId
 */
export const fetchSupporterCount = async (creatorId) => {
  return apiRequest(`/api/fans/${creatorId}/supporters/count`, { method: "GET" });
};

/**
 * =========================
 * ERROR SAFE WRAPPERS
 * =========================
 * (You can use these for safer calls in components)
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
    console.error("Fan API Error:", err.message);
    return null; // Return null for safer usage in components
  }
}
/**
 * Fetch transaction history for either a creator or a fan.
 * @param {string} mode - "creator" or "fan"
 */
export const fetchTransactionHistory = async (mode = "creator") => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/fans/transactions?mode=${mode}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to load transaction history");
  const data = await res.json();
  return data.transactions;
};
