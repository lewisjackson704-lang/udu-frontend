import React, { useEffect, useState } from "react";
import { Loader2, Clock, Heart } from "lucide-react";
import { fetchReplies, toggleLikeComment } from "../../api/comments.js";

/**
 * Replies.jsx
 * Displays a threaded list of replies under a parent comment.
 * Props:
 *  - parentId: ID of the comment to fetch replies for
 *  - replies (optional): preloaded replies from parent component
 */
export default function Replies({ parentId, replies: initialReplies = [] }) {
  const [replies, setReplies] = useState(initialReplies);
  const [loading, setLoading] = useState(!initialReplies.length);
  const [error, setError] = useState(""); // State to handle errors

  useEffect(() => {
    if (initialReplies.length === 0) {
      const loadReplies = async () => {
        try {
          setLoading(true);
          setError(""); // Reset error state
          const data = await fetchReplies(parentId);
          setReplies(data?.replies || []);
        } catch (err) {
          console.error("Failed to load replies:", err);
          setError("Failed to load replies. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      loadReplies();
    }
  }, [parentId, initialReplies]);

  const handleLike = async (replyId) => {
    try {
      const updated = await toggleLikeComment(replyId);
      setReplies((prev) =>
        prev.map((reply) =>
          reply._id === replyId ? { ...reply, likes: updated.likes } : reply
        )
      );
    } catch (err) {
      console.error("Failed to like reply:", err);
      setError("Failed to like reply. Please try again.");
    }
  };

  if (loading) {
    return (
      <div
        className="flex justify-center py-3"
        role="status"
        aria-label="Loading replies"
      >
        <Loader2 size={18} className="animate-spin text-amber-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="text-sm text-red-400 ml-2 py-2"
        role="alert"
        aria-label="Error loading replies"
      >
        {error}
      </div>
    );
  }

  if (!replies.length) {
    return (
      <div
        className="text-sm text-white/60 ml-2 py-2"
        aria-label="No replies available"
      >
        No replies yet.
      </div>
    );
  }

  return (
    <div className="space-y-3" aria-label="Replies list">
      {replies.map((reply) => (
        <div
          key={reply._id}
          className="rounded-lg border border-white/5 bg-black/30 px-3 py-2 text-sm backdrop-blur-md"
          aria-label={`Reply by ${reply.author?.username || "Anonymous"}`}
        >
          <div className="flex items-start gap-3">
            <img
              src={reply.author?.avatar || "/default-avatar.png"}
              alt={`${reply.author?.username || "Anonymous"}'s avatar`}
              className="h-7 w-7 rounded-full object-cover"
              aria-hidden="true"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">
                  {reply.author?.username || "Anonymous"}
                </span>
                <span
                  className="text-xs text-white/50 flex items-center gap-1"
                  aria-label={`Reply posted on ${new Date(
                    reply.createdAt
                  ).toLocaleDateString()}`}
                >
                  <Clock size={11} aria-hidden="true" />{" "}
                  {new Date(reply.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-white/80 text-sm mt-1 whitespace-pre-wrap">
                {reply.text}
              </p>

              <button
                onClick={() => handleLike(reply._id)}
                className={`mt-2 flex items-center gap-1 text-xs transition ${
                  reply.likes?.length > 0
                    ? "text-amber-400"
                    : "text-white/60 hover:text-amber-300"
                }`}
                aria-label={`Like reply`}
              >
                <Heart size={12} aria-hidden="true" /> {reply.likes?.length || 0}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
