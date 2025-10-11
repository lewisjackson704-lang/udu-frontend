import apiClient from "./apiClient.js";

// Register
export const registerUser = async (data) => {
  return await apiClient.post("/auth/register", data);
};

// Login
export const loginUser = async (data) => {
  const res = await apiClient.post("/auth/login", data);
  if (res.token) localStorage.setItem("token", res.token);
  return res.user;
};

// Logout
export const logoutUser = async () => {
  await apiClient.post("/auth/logout");
  localStorage.removeItem("token");
};

// Current user
export const getUserProfile = async () => {
  return await apiClient.get("/users/me");
};

// Get another user’s profile
export const fetchUserProfile = async (id) => {
  return await apiClient.get(`/users/${id}`);
};

// Get videos for a user
export const fetchUserVideos = async (id) => {
  return await apiClient.get(`/videos/user/${id}`);
};
