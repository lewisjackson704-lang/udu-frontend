import React, { useEffect, useState } from "react";
import { MessageSquare, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import {
  fetchComments,
  createComment,
  toggleLikeComment,
  deleteComment,
} from "../../api/comments.js";
import CommentInput from "./CommentInput.jsx";
import CommentItem from "./CommentItem.jsx";

/**
 * Comments.jsx
 * Main comment feed for videos, streams, and posts
 * Connects directly with the comment API
 */
export default function Comments({ targetId, type = "video", user }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(true);
  const [error, setError] = useState("");

  // Load comments when targetId or type changes
  useEffect(() => {
    const loadComments = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchComments(targetId, type);
        setComments(data?.comments || []);
      } catch (err) {
        console.error("Error loading comments:", err);
        setError("Failed to load comments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (targetId) loadComments();
  }, [targetId, type]);

  // Add a new comment
  const handleAddComment = async (text) => {
    if (!text.trim()) return;
    try {
      const newComment = await createComment(targetId, { text, type });
      setComments((prev) => [newComment, ...prev]);
    } catch (err) {
      console.error("Failed to add comment:", err);
      setError("Failed to add comment. Please try again.");
    }
  };

  // Like a comment
  const handleLike = async (commentId) => {
    try {
      const updated = await toggleLikeComment(commentId);
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId ? { ...comment, likes: updated.likes } : comment
        )
      );
    } catch (err) {
      console.error("Failed to like comment:", err);
      setError("Failed to like comment. Please try again.");
    }
  };

  // Delete a comment
  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((comment) => comment._id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment:", err);
      setError("Failed to delete comment. Please try again.");
    }
  };

  return (
    <div
      className="mt-6 rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-md"
      aria-label="Comments section"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-amber-400 flex items-center gap-2 font-semibold">
          <MessageSquare size={18} aria-hidden="true" /> Comments ({comments.length})
        </h2>
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-white/60 hover:text-amber-300 flex items-center gap-1 text-sm"
          aria-label={showComments ? "Hide comments" : "Show comments"}
        >
          {showComments ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
          {showComments ? "Hide" : "Show"}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 text-red-400 text-sm" role="alert">
          {error}
        </div>
      )}

      {/* Input Box */}
      {user && (
        <div className="mb-4">
          <CommentInput user={user} onSubmit={handleAddComment} />
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <div
          className="flex justify-center py-6"
          role="status"
          aria-label="Loading comments"
        >
          <Loader2 className="animate-spin text-amber-400" size={20} />
        </div>
      ) : showComments ? (
        comments.length > 0 ? (
          <div className="space-y-3" aria-label="Comments list">
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                onLike={() => handleLike(comment._id)}
                onDelete={() => handleDelete(comment._id)}
                user={user}
              />
            ))}
          </div>
        ) : (
          <p className="text-white/60 text-sm" aria-label="No comments message">
            Be the first to comment!
          </p>
        )
      ) : null}
    </div>
  );
}
