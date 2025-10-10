import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null); // Safer initialization
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  /**
   * Fetches user information using the stored token.
   */
  const fetchUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("Unauthorized or invalid token");
      }

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error("Authentication error:", err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logs in the user by setting the token and user data.
   * @param {Object} userData - The user object returned from the server.
   * @param {string} jwt - The JWT token received from the server.
   */
  const login = (userData, jwt) => {
    try {
      setUser(userData);
      setToken(jwt);
      localStorage.setItem("token", jwt);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  /**
   * Logs out the user by clearing the token and user data.
   */
  const logout = () => {
    try {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook for accessing the auth context.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
