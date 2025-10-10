import React, { useEffect, useState, useCallback } from "react";
import { Loader2, Eye, Heart, Users } from "lucide-react";
import DOMPurify from "dompurify"; // Use DOMPurify to sanitize user-generated content
import { fetchStreamById } from "../../api/streams.js";
import Comments from "../Comments/Comments.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import useSocket from "../../hooks/useSocket.js";

/**
 * LivePlayer.jsx
 * Unified live stream player + engagement system
 */
export default function LivePlayer({ streamId }) {
  const { user } = useAuth();
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewerCount, setViewerCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState(""); // Track errors for better user feedback

  const realtimeChannel = streamId ? `stream:${streamId}` : null;

  // Real-time socket setup
  const socket = useSocket(
    realtimeChannel
      ? {
          "viewer:count": useCallback(
            ({ room, count }) => {
              if (room === realtimeChannel) {
                setViewerCount(Number(count) || 0); // Ensure the count is a safe number
              }
            },
            [realtimeChannel]
          ),
        }
      : {}
  );

  // Load stream details
  useEffect(() => {
    const loadStream = async () => {
      try {
        setLoading(true);
        setError(""); // Reset error state
        const data = await fetchStreamById(streamId);

        // Validate stream data
        if (!data || !data.streamUrl || !data.creator) {
          throw new Error("Invalid stream data");
        }

        setStream({
          ...data,
          creator: {
            ...data.creator,
            name: DOMPurify.sanitize(data.creator.name || "Unknown Creator"),
            avatar: DOMPurify.sanitize(data.creator.avatar || "/default-avatar.png"),
          },
        });
        setViewerCount(data.viewers || 0);
      } catch (err) {
        console.error("Failed to load stream:", err);
        setError("Failed to load stream. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (streamId) loadStream();
  }, [streamId]);

  // Join/leave real-time room
  useEffect(() => {
    if (!realtimeChannel || !user) return;

    socket.emit("room:join", { room: realtimeChannel });
    socket.emit("viewer:join", { room: realtimeChannel, userId: user?._id });

    return () => {
      socket.emit("viewer:leave", { room: realtimeChannel, userId: user?._id });
      socket.emit("room:leave", { room: realtimeChannel });
    };
  }, [socket, realtimeChannel, user]);

  // Loading state
  if (loading) {
    return (
      <div
        className="flex h-screen items-center justify-center bg-black text-white/70"
        role="status"
        aria-label="Loading live stream"
      >
        <Loader2 size={28} className="animate-spin text-amber-400 mb-2" />
        Loading stream...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className="flex h-screen items-center justify-center bg-black text-red-400 text-center"
        role="alert"
        aria-label="Error loading live stream"
      >
        {error}
      </div>
    );
  }

  // No stream found
  if (!stream) {
    return (
      <div
        className="flex h-screen items-center justify-center bg-black text-white/60"
        role="alert"
        aria-label="Live stream not found"
      >
        Stream not found.
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white flex flex-col md:flex-row"
      aria-label="Live stream player page"
    >
      {/* Stream Player */}
      <div className="flex-1 p-4 md:p-6">
        <div
          className="rounded-xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-md shadow-xl relative"
          aria-label="Live stream player"
        >
          <video
            src={DOMPurify.sanitize(stream.streamUrl)}
            controls
            autoPlay
            className="w-full aspect-video object-cover"
          />
          <div
            className="absolute top-3 left-3 bg-amber-500/80 px-2 py-1 rounded-md text-xs font-semibold text-black"
            aria-label="Live indicator"
          >
            LIVE
          </div>
          <div
            className="absolute top-3 right-3 flex items-center gap-2 bg-black/60 px-2 py-1 rounded-md text-xs border border-white/10"
            aria-label={`Currently ${viewerCount} viewers`}
          >
            <Eye size={12} className="text-amber-400" />
            <span>{viewerCount}</span>
          </div>
        </div>

        {/* Stream Info */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={DOMPurify.sanitize(stream.creator.avatar)}
              alt={`${stream.creator.name}'s avatar`}
              className="h-10 w-10 rounded-full object-cover"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-white">{stream.creator.name}</p>
              <p className="text-xs text-white/60">Streaming now</p>
            </div>
          </div>
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1 text-sm ${
              liked ? "text-amber-400" : "text-white/60 hover:text-amber-300 transition"
            }`}
            aria-label={liked ? "Unlike stream" : "Like stream"}
          >
            <Heart size={14} aria-hidden="true" /> {liked ? "Liked" : "Like"}
          </button>
        </div>

        {/* Live Chat */}
        <div className="mt-6" aria-label="Live chat">
          <Comments
            targetId={stream._id}
            type="stream"
            user={user}
            realtimeChannel={realtimeChannel}
          />
        </div>
      </div>
    </div>
  );
}
