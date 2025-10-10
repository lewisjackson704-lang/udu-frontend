import React, { useEffect, useState } from "react";
import { Loader2, Eye, Heart, Users } from "lucide-react";
import { fetchStreamById } from "../../api/streams.js";
import Comments from "../Comments/Comments.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

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
  const [error, setError] = useState(""); // Error state for better feedback

  // Load stream data
  useEffect(() => {
    const loadStream = async () => {
      try {
        setLoading(true);
        setError(""); // Reset error state
        const data = await fetchStreamById(streamId);
        setStream(data);
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
            src={stream.streamUrl}
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
        </div>

        {/* Stream Info */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={stream.creator?.avatar || "/default-avatar.png"}
              alt={`${stream.creator?.name || "Creator"}'s avatar`}
              className="h-10 w-10 rounded-full object-cover"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold text-white">
                {stream.creator?.name || "Creator"}
              </p>
              <p
                className="text-xs text-white/60 flex items-center gap-1"
                aria-label={`Currently ${viewerCount} viewers`}
              >
                <Eye size={12} aria-hidden="true" /> {viewerCount} watching
              </p>
            </div>
          </div>
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1 text-sm ${
              liked
                ? "text-amber-400"
                : "text-white/60 hover:text-amber-300 transition"
            }`}
            aria-label={liked ? "Unlike stream" : "Like stream"}
          >
            <Heart size={14} aria-hidden="true" /> {liked ? "Liked" : "Like"}
          </button>
        </div>

        {/* Live Chat */}
        <div className="mt-6" aria-label="Live chat">
          <Comments targetId={stream._id} type="stream" user={user} />
        </div>
      </div>

      {/* Viewer Panel */}
      <aside
        className="w-full md:w-[380px] p-4 border-t md:border-t-0 md:border-l border-white/10 bg-black/30 backdrop-blur-md"
        aria-label="Viewer list"
      >
        <h3 className="flex items-center gap-2 mb-3 font-semibold text-amber-400">
          <Users size={16} aria-hidden="true" /> Viewers
        </h3>
        <div className="text-sm text-white/70">
          {stream.viewersList?.length ? (
            stream.viewersList.map((viewer) => (
              <div
                key={viewer._id}
                className="flex items-center gap-2 py-1 border-b border-white/5"
                aria-label={`Viewer: ${viewer.username}`}
              >
                <img
                  src={viewer.avatar || "/default-avatar.png"}
                  className="h-6 w-6 rounded-full object-cover"
                  alt={`${viewer.username}'s avatar`}
                  aria-hidden="true"
                />
                <span>{viewer.username}</span>
              </div>
            ))
          ) : (
            <p className="text-white/60">No viewers yet.</p>
          )}
        </div>
      </aside>
    </div>
  );
}
