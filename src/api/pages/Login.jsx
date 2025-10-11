import React, { useState } from "react";
import { loginUser } from "../api/auth.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Error state
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages

    // Basic client-side validation
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true); // Set loading state
    try {
      const data = await loginUser(form); // Call API
      login(data); // Update context
    } catch (err) {
      setError("Login failed. Please check your credentials."); // User-friendly error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-black/60 p-6 rounded-xl border border-white/10 backdrop-blur-md w-80"
        aria-labelledby="login-form-title"
      >
        <h1
          id="login-form-title"
          className="text-amber-400 text-xl font-semibold mb-4"
        >
          Login
        </h1>
        {error && (
          <div
            className="text-red-400 text-sm mb-3"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-3 p-2 bg-black/40 border border-white/20 rounded text-sm"
          aria-label="Email"
        />
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mb-4 p-2 bg-black/40 border border-white/20 rounded text-sm"
          aria-label="Password"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 ${
            loading
              ? "bg-amber-500/40 text-amber-300 cursor-not-allowed"
              : "bg-amber-500/20 text-amber-400 hover:bg-amber-400/30"
          } border border-amber-400/40 rounded transition`}
          aria-busy={loading}
          aria-disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
