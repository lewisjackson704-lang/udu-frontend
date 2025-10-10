import React, { useEffect, useState, useCallback } from "react";
import { MessageSquare, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { fetchComments, createComment, toggleLikeComment, deleteComment } from "../../api/comments.js";
import CommentInput from "./CommentInput.jsx";
import CommentItem from "./CommentItem.jsx";
import useSocket from "../../hooks/useSocket.js";

export default function Comments({ targetId, type = "video", user, realtimeChannel }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadComments = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchComments(targetId, type);
        setComments(data?.comments || []);
      } catch (err) {
        console.error("Error loading comments:", err);
        setError("Failed to load comments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (targetId) loadComments();
  }, [targetId, type]);

  const socket = useSocket(
    realtimeChannel
      ? {
          "comment:new": (payload) => {
            if (payload?.targetId === targetId && payload?.type === type) {
              setComments((prev) => {
                if (prev.some((c) => c._id === payload.comment?._id)) return prev;
                return [payload.comment, ...prev];
              });
            }
          },
        }
      : {}
  );

  const handleAddComment = useCallback(async (text) => {
    if (!text.trim()) return;
    try {
      const newComment = await createComment(targetId, { text, type });
      setComments((prev) => [newComment, ...prev]);
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  }, [targetId, type]);

  return (
    <div aria-live="polite">
      {error && <p className="text-red-400">{error}</p>}
      {/* Rest of the component */}
    </div>
  );
}
