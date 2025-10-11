import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Ensures cookies are sent with requests
});

// Token management
const getToken = () => {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
};

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (Unauthorized) for token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retry loops
      try {
        // Attempt to refresh the token (you'll need to implement this API endpoint)
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        const { token } = refreshResponse.data;

        // Save the new token and retry the original request
        localStorage.setItem("token", token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Handle logout or redirection if refresh fails
        return Promise.reject(refreshError);
      }
    }

    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);

export default apiClient;
