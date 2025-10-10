import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ThumbsUp,
  MessageSquare,
  Share2,
  Loader2,
  Heart,
  ChevronRight,
} from "lucide-react";
import { fetchVideoById, fetchRelatedVideos } from "../api/videos.js";
import VideoCard from "../components/Video/VideoCard.jsx";
import Comments from "../components/Comments/Comments.jsx";
import { useAuth } from "../context/AuthContext.jsx";

/**
 * VideoWatch.jsx
 * Displays video player, details, and comment feed
 */
export default function VideoWatch() {
  const { id } = useParams();
  const { user } = useAuth();
  const [video, setVideo] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Error state for better feedback
  const [liked, setLiked] = useState(false);
  const [support, setSupport] = useState(false);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        setLoading(true);
        setError(""); // Reset error state
        const videoData = await fetchVideoById(id);
        const relatedVideos = await fetchRelatedVideos(id);
        setVideo(videoData);
        setRelated(relatedVideos || []);
      } catch (err) {
        console.error("Error loading video:", err);
        setError("Failed to load video. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadVideo();
  }, [id]);

  if (loading) {
    return (
      <div
        className="flex h-screen flex-col items-center justify-center bg-black text-white/70"
        role="status"
        aria-label="Loading video"
      >
        <Loader2 size={28} className="animate-spin text-amber-400 mb-2" />
        Loading video...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex h-screen items-center justify-center bg-black text-red-400 text-center"
        role="alert"
        aria-label="Error loading video"
      >
        {error}
      </div>
    );
  }

  if (!video) {
    return (
      <div
        className="flex h-screen items-center justify-center bg-black text-white/60"
        role="alert"
        aria-label="Video not found"
      >
        Video not found.
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white flex flex-col md:flex-row"
      aria-label="Video watch page"
    >
      {/* Main Video Section */}
      <div className="flex-1 md:p-6">
        <div
          className="rounded-xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-md shadow-xl"
          aria-label="Video player"
        >
          <video
            src={video.videoUrl}
            controls
            autoPlay
            className="w-full aspect-video object-cover"
          />
        </div>

        {/* Video Info */}
        <div className="mt-4 flex flex-col gap-3">
          <h1 className="text-lg font-bold text-amber-400">{video.title}</h1>
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-white/60">
            <div className="flex items-center gap-3">
              <span>{video.views?.toLocaleString() || 0} views</span>
              <span>• {new Date(video.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-1 ${
                  liked ? "text-amber-300" : "text-white/60 hover:text-amber-300"
                }`}
                aria-label={liked ? "Unlike video" : "Like video"}
              >
                <ThumbsUp size={16} /> {liked ? "Liked" : "Like"}
              </button>
              <button
                onClick={() => setSupport(!support)}
                className={`flex items-center gap-1 ${
                  support
                    ? "text-pink-400"
                    : "text-white/60 hover:text-pink-400"
                }`}
                aria-label={
                  support ? "Remove support for video" : "Support video"
                }
              >
                <Heart size={16} /> Support
              </button>
              <button
                className="flex items-center gap-1 text-white/60 hover:text-amber-300"
                aria-label="Share video"
              >
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>

          {/* Creator Info */}
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
            <div className="flex items-center gap-3">
              <img
                src={video.creator?.avatar || "/default-avatar.png"}
                alt={`${video.creator?.name || "Creator"}'s avatar`}
                className="h-10 w-10 rounded-full object-cover"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold text-white">
                  {video.creator?.name || "Creator"}
                </p>
                <p className="text-xs text-white/60">
                  {video.creator?.followers || 0} followers
                </p>
              </div>
            </div>
            <a
              href={`/profile/${video.creator?._id}`}
              className="rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-sm text-amber-300 hover:bg-amber-400/20 transition"
              aria-label={`View profile of ${video.creator?.name || "Creator"}`}
            >
              View Profile
            </a>
          </div>

          {/* Description */}
          <div
            className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3 text-sm text-white/70 whitespace-pre-wrap"
            aria-label="Video description"
          >
            {video.description || "No description available."}
          </div>

          {/* Comments Feed */}
          <div className="mt-6" aria-label="Comments section">
            <Comments targetId={video._id} type="video" user={user} />
          </div>
        </div>
      </div>

      {/* Related Videos Sidebar */}
      <aside
        className="w-full md:w-[380px] p-4 border-t md:border-t-0 md:border-l border-white/10 bg-black/30 backdrop-blur-md"
        aria-label="Related videos"
      >
        <h3 className="flex items-center gap-2 mb-3 font-semibold text-amber-400">
          <ChevronRight size={16} aria-hidden="true" /> Related Videos
        </h3>
        {related.length > 0 ? (
          <div className="space-y-3">
            {related.map((vid) => (
              <VideoCard key={vid._id} video={vid} small />
            ))}
          </div>
        ) : (
          <p className="text-white/60 text-sm">No related videos found.</p>
        )}
      </aside>
    </div>
  );
}
