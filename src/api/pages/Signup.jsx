import React, { useState } from "react";
import { registerUser } from "../api/auth.js";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Signup successful!");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-black/60 p-6 rounded-xl border border-white/10 backdrop-blur-md w-80"
      >
        <h1 className="text-amber-400 text-xl font-semibold mb-4">Sign Up</h1>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full mb-3 p-2 bg-black/40 border border-white/20 rounded text-sm"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-3 p-2 bg-black/40 border border-white/20 rounded text-sm"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mb-4 p-2 bg-black/40 border border-white/20 rounded text-sm"
        />
        <button
          type="submit"
          className="w-full py-2 bg-amber-500/20 text-amber-400 border border-amber-400/40 rounded hover:bg-amber-400/30 transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
