// src/api/fans.js
// Full API client for fan tiers, subscriptions, supporter data, and monetization

import apiClient from "./apiClient.js";

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
  try {
    return await apiRequest(`/api/fans/tiers`, { method: "GET" });
  } catch (error) {
    console.error("Error fetching fan tiers:", error);
    throw error;
  }
};

/**
 * Create a new fan tier (for creators)
 * @param {Object} tier - { name, price, perks }
 */
export const createFanTier = async (tier) => {
  if (!tier || typeof tier !== "object") {
    throw new Error("Invalid tier data provided.");
  }

  try {
    return await apiRequest(`/api/fans/tiers`, {
      method: "POST",
      body: JSON.stringify(tier),
    });
  } catch (error) {
    console.error("Error creating fan tier:", error);
    throw error;
  }
};

/**
 * Update an existing fan tier
 * @param {string} id - Tier ID
 * @param {Object} updates - { name?, price?, perks? }
 */
export const updateFanTier = async (id, updates) => {
  if (!id || !updates || typeof updates !== "object") {
    throw new Error("Tier ID and valid updates are required.");
  }

  try {
    return await apiRequest(`/api/fans/tiers/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  } catch (error) {
    console.error(`Error updating fan tier ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a fan tier
 * @param {string} id - Tier ID
 */
export const deleteFanTier = async (id) => {
  if (!id) {
    throw new Error("Tier ID is required to delete a tier.");
  }

  try {
    return await apiRequest(`/api/fans/tiers/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error(`Error deleting fan tier ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch all supporters of a given tier
 * @param {string} tierId
 */
export const fetchSupportersByTier = async (tierId) => {
  if (!tierId) {
    throw new Error("Tier ID is required to fetch supporters.");
  }

  try {
    return await apiRequest(`/api/fans/tiers/${tierId}/supporters`, { method: "GET" });
  } catch (error) {
    console.error(`Error fetching supporters for tier ID ${tierId}:`, error);
    throw error;
  }
};

/**
 * Fetch overall creator monetization stats (for dashboard)
 */
export const fetchCreatorStats = async () => {
  try {
    return await apiRequest(`/api/fans/creator/stats`, { method: "GET" });
  } catch (error) {
    console.error("Error fetching creator stats:", error);
    throw error;
  }
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
  if (!creatorId) {
    throw new Error("Creator ID is required to fetch available tiers.");
  }

  try {
    return await apiRequest(`/api/fans/${creatorId}/tiers`, { method: "GET" });
  } catch (error) {
    console.error(`Error fetching available tiers for creator ID ${creatorId}:`, error);
    throw error;
  }
};

/**
 * Subscribe to a tier
 * @param {string} tierId
 */
export const subscribeToTier = async (tierId) => {
  if (!tierId) {
    throw new Error("Tier ID is required to subscribe.");
  }

  try {
    return await apiRequest(`/api/fans/subscribe/${tierId}`, { method: "POST" });
  } catch (error) {
    console.error(`Error subscribing to tier ID ${tierId}:`, error);
    throw error;
  }
};

/**
 * Cancel a subscription
 * @param {string} tierId
 */
export const cancelSubscription = async (tierId) => {
  if (!tierId) {
    throw new Error("Tier ID is required to cancel a subscription.");
  }

  try {
    return await apiRequest(`/api/fans/unsubscribe/${tierId}`, { method: "DELETE" });
  } catch (error) {
    console.error(`Error canceling subscription for tier ID ${tierId}:`, error);
    throw error;
  }
};

/**
 * Get a fan’s active subscriptions
 */
export const fetchUserSubscriptions = async () => {
  try {
    return await apiRequest(`/api/fans/subscriptions`, { method: "GET" });
  } catch (error) {
    console.error("Error fetching user subscriptions:", error);
    throw error;
  }
};

/**
 * Fetch a specific creator's supporter count
 * @param {string} creatorId
 */
export const fetchSupporterCount = async (creatorId) => {
  if (!creatorId) {
    throw new Error("Creator ID is required to fetch supporter count.");
  }

  try {
    return await apiRequest(`/api/fans/${creatorId}/supporters/count`, { method: "GET" });
  } catch (error) {
    console.error(`Error fetching supporter count for creator ID ${creatorId}:`, error);
    throw error;
  }
};

/**
 * Fetch transaction history for either a creator or a fan.
 * @param {string} mode - "creator" or "fan"
 */
export const fetchTransactionHistory = async (mode = "creator") => {
  if (!["creator", "fan"].includes(mode)) {
    throw new Error('Invalid mode. Must be "creator" or "fan".');
  }

  try {
    const response = await apiRequest(`/api/fans/transactions?mode=${mode}`, { method: "GET" });
    return response;
  } catch (error) {
    console.error(`Error fetching transaction history (mode: ${mode}):`, error);
    throw error;
  }
};
