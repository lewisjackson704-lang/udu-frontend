import React, { useState } from "react";
import { Send, Smile } from "lucide-react";

/**
 * CommentInput.jsx
 * Handles creating new comments and replies.
 * Props:
 *  - user: current logged-in user object
 *  - onSubmit: (text) => void
 */
export default function CommentInput({ user, onSubmit }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      await onSubmit(text.trim());
      setText("");
    } catch (err) {
      console.error("Failed to submit comment:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-md"
      aria-label="Comment input form"
    >
      {/* User Avatar */}
      <img
        src={user?.avatar || "/default-avatar.png"}
        alt={`${user?.name || "User"}'s avatar`}
        className="h-8 w-8 rounded-full object-cover"
      />

      {/* Input Field */}
      <input
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
        className="flex-1 bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
        aria-label="Comment input field"
      />

      {/* Emoji button (future integration) */}
      <button
        type="button"
        className="text-white/50 hover:text-amber-300 transition"
        title="Add emoji"
        aria-label="Add emoji"
      >
        <Smile size={18} aria-hidden="true" />
      </button>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-1 rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-sm font-medium text-amber-300 hover:bg-amber-400/20 transition"
        aria-label="Submit comment"
      >
        {loading ? (
          <span className="opacity-70">Sending...</span>
        ) : (
          <>
            <Send size={14} aria-hidden="true" />
            Send
          </>
        )}
      </button>
    </form>
  );
}
