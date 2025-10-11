import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Error404({ message = "Page not found" }) {
  useEffect(() => {
    document.title = "404 - Page Not Found"; // Dynamic title update
  }, []);

  return (
    <main
      className="flex flex-col items-center justify-center h-screen bg-black text-white"
      aria-label="404 error page"
    >
      <h1
        className="text-6xl font-bold text-amber-400 mb-2"
        aria-label="404 error"
      >
        404
      </h1>
      <p
        className="text-white/70 mb-6"
        role="alert"
        aria-live="polite"
      >
        {message}
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-amber-500/20 text-amber-400 border border-amber-400/40 rounded-lg hover:bg-amber-400/30 transition"
        aria-label="Back to home page"
      >
        Back to Home
      </Link>
    </main>
  );
}
