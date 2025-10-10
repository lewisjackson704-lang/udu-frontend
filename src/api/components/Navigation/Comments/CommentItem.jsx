import React, { useState } from "react";
import { Heart, MessageCircle, Trash2, Clock } from "lucide-react";
import Replies from "./Replies.jsx";
import CommentInput from "./CommentInput.jsx";
import { createReply } from "../../api/comments.js";

/**
 * CommentItem.jsx
 * Renders a single comment with avatar, text, and actions.
 * Props:
 *  - comment: the comment object
 *  - onLike: function to toggle like
 *  - onDelete: function to delete comment
 *  - user: current logged-in user
 */
export default function CommentItem({ comment, onLike, onDelete, user }) {
  const [showReplies, setShowReplies] = useState(false); // Controls replies visibility
  const [replying, setReplying] = useState(false); // Controls reply input visibility
  const [replies, setReplies] = useState(comment.replies || []); // Stores replies
  const [error, setError] = useState(""); // Stores error messages

  /**
   * Handles adding a reply to the current comment.
   * @param {string} text - The reply text.
   */
  const handleAddReply = async (text) => {
    if (!text.trim()) return; // Prevent submitting empty replies
    try {
      const newReply = await createReply(comment._id, { text });
      setReplies((prev) => [...prev, newReply]);
      setReplying(false);
    } catch (err) {
      console.error("Failed to add reply:", err);
      setError("Failed to add reply. Please try again.");
    }
  };

  return (
    <div
      className="rounded-lg border border-white/10 bg-black/40 p-3 backdrop-blur-md"
      aria-label={`Comment by ${comment.author?.username || "Anonymous"}`}
    >
      {/* Top Row — Avatar + Name */}
      <div className="flex items-start gap-3">
        <img
          src={comment.author?.avatar || "/default-avatar.png"}
          alt={`${comment.author?.username || "Anonymous"}'s avatar`}
          className="h-9 w-9 rounded-full object-cover"
          aria-hidden="true"
        />

        <div className="flex-1">
          {/* Comment Header */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-white">
              {comment.author?.username || "Anonymous"}
            </p>
            <span
              className="text-xs text-white/50 flex items-center gap-1"
              aria-label={`Posted on ${new Date(comment.createdAt).toLocaleDateString()}`}
            >
              <Clock size={12} aria-hidden="true" />{" "}
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Comment Text */}
          <p className="text-white/80 text-sm mt-1 whitespace-pre-wrap">
            {comment.text}
          </p>

          {/* Actions */}
          <div className="mt-2 flex items-center gap-4 text-sm">
            {/* Like Button */}
            <button
              onClick={onLike}
              className={`flex items-center gap-1 transition ${
                comment.likes?.includes(user?._id)
                  ? "text-amber-400"
                  : "text-white/60 hover:text-amber-300"
              }`}
              aria-label={`Like comment by ${comment.author?.username}`}
            >
              <Heart size={14} aria-hidden="true" /> {comment.likes?.length || 0}
            </button>

            {/* Reply Button */}
            <button
              onClick={() => setReplying(!replying)}
              className="flex items-center gap-1 text-white/60 hover:text-amber-300 transition"
              aria-label={`Reply to comment by ${comment.author?.username}`}
            >
              <MessageCircle size={14} aria-hidden="true" /> Reply
            </button>

            {/* Delete Button (if the user owns the comment) */}
            {user?._id === comment.author?._id && (
              <button
                onClick={onDelete}
                className="flex items-center gap-1 text-red-400 hover:text-red-300 transition"
                aria-label="Delete your comment"
              >
                <Trash2 size={14} aria-hidden="true" /> Delete
              </button>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div
              className="text-red-400 text-xs mt-2"
              role="alert"
              aria-label="Reply error message"
            >
              {error}
            </div>
          )}

          {/* Reply Input */}
          {replying && user && (
            <div className="mt-3 ml-6">
              <CommentInput user={user} onSubmit={handleAddReply} />
            </div>
          )}

          {/* View Replies */}
          {comment.replyCount > 0 && !showReplies && (
            <button
              onClick={() => setShowReplies(true)}
              className="text-xs text-amber-400 mt-2 ml-1 hover:underline"
              aria-label="View replies"
            >
              View {comment.replyCount}{" "}
              {comment.replyCount === 1 ? "reply" : "replies"}
            </button>
          )}

          {/* Replies Section */}
          {showReplies && (
            <div className="mt-3 ml-8" aria-label="Replies section">
              <Replies parentId={comment._id} replies={replies} />
              {comment.replyCount > replies.length && (
                <button
                  onClick={() => setShowReplies(false)}
                  className="text-xs text-white/60 hover:text-amber-400 mt-2"
                  aria-label="Hide replies"
                >
                  Hide replies
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
