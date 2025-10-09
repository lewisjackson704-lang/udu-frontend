import React from "react";
import PropTypes from "prop-types";
import VideoCard from "./VideoCard";

export default function VideoGrid({
  videos = [],
  onItemClick,
  className = "",
  emptyText = "No videos yet.",
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <div
        data-testid="video-grid-loading"
        className="grid place-items-center rounded-2xl border border-dashed border-zinc-300/50 p-10 text-sm text-zinc-500 dark:border-zinc-700/50 dark:text-zinc-400"
      >
        Loading videos...
      </div>
    );
  }

  if (!videos?.length) {
    return (
      <div
        data-testid="video-grid-empty"
        className="grid place-items-center rounded-2xl border border-dashed border-zinc-300/50 p-10 text-sm text-zinc-500 dark:border-zinc-700/50 dark:text-zinc-400"
      >
        {emptyText}
      </div>
    );
  }

  return (
    <div
      role="list"
      aria-label="Video grid"
      data-testid="video-grid"
      className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
    >
      {videos.map((v, index) => (
        <VideoCard key={v.id || v._id || index} video={v} onClick={onItemClick} />
      ))}
    </div>
  );
}

VideoGrid.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  onItemClick: PropTypes.func,
  className: PropTypes.string,
  emptyText: PropTypes.string,
  isLoading: PropTypes.bool,
};
