import React from "react";
import PropTypes from "prop-types";
import { Heart, Eye } from "lucide-react";

/**
 * ProfileVideos — adaptive user video grid.
 * - Works for creators and viewers
 * - Reuses amber-accent glass style
 */
export default function ProfileVideos({
  videos = [
    { id: 1, title: "Studio Session Vibes", views: 4200, likes: 650, thumbnail: "/logo192.png" },
    { id: 2, title: "New Single Teaser", views: 3100, likes: 480, thumbnail: "/logo192.png" },
    { id: 3, title: "Behind The Scenes", views: 5000, likes: 780, thumbnail: "/logo192.png" },
  ],
}) {
  return (
    <div
      className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      role="region"
      aria-label="User's video grid"
    >
      {videos.map((vid) => (
        <div
          key={vid.id}
          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/70 dark:bg-black/40 transition hover:scale-[1.02] hover:shadow-lg"
          role="article"
          aria-label={`Video: ${vid.title}`}
        >
          {/* Video Thumbnail */}
          <img
            src={vid.thumbnail}
            alt={`${vid.title} thumbnail`}
            className="h-40 w-full object-cover transition group-hover:opacity-90"
            onError={(e) => {
              console.error(`Thumbnail failed to load for video ID: ${vid.id}`);
              e.target.src = "/fallback-thumbnail.png"; // Fallback thumbnail
            }}
          />

          {/* Video Info */}
          <div className="p-3">
            <h4
              className="truncate text-sm font-semibold text-black dark:text-white"
              title={vid.title}
            >
              {vid.title}
            </h4>
            <div className="mt-1 flex items-center justify-between text-xs text-black/70 dark:text-white/70">
              <span className="flex items-center gap-1">
                <Eye size={12} aria-hidden="true" /> {vid.views.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Heart size={12} className="text-rose-400" aria-hidden="true" />{" "}
                {vid.likes.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

ProfileVideos.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      views: PropTypes.number.isRequired,
      likes: PropTypes.number.isRequired,
      thumbnail: PropTypes.string.isRequired,
    })
  ),
};
