import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Eye, Heart } from "lucide-react";
import { formatNumber } from "@/lib/utils/formatters";

export default function VideoCard({
  video,
  onClick,
  className = "",
  showCreator = true,
  compact = false,
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      className={`group cursor-pointer ${className} ${compact ? "compact" : ""}`}
      onClick={() => onClick?.(video)}
      aria-label={video?.title || "Video card"}
    >
      <div className="relative overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-900 aspect-video">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-zinc-300/50 dark:bg-zinc-700/40" />
        )}
        <img
          src={video?.thumbnailUrl || video?.thumbnail || "/placeholder.jpg"}
          srcSet={`${video?.thumbnailUrl || video?.thumbnail || "/placeholder.jpg"} 1x, ${video?.thumbnailHD || "/placeholder-hd.jpg"} 2x`}
          alt={video?.title || "Video Thumbnail"}
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-90" />
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
          <span className="line-clamp-1 text-[13px] font-semibold text-white drop-shadow">
            {video?.title || "Untitled"}
          </span>
          {video?.duration && (
            <span className="rounded-md bg-black/65 px-2 py-0.5 text-[11px] font-semibold text-white">
              {video.duration}
            </span>
          )}
        </div>
      </div>
      <div className="mt-2 flex items-start gap-3">
        {showCreator && (
          <img
            src={video?.creator?.avatar || "/default-avatar.png"}
            alt={video?.creator?.name || "Creator"}
            className="h-8 w-8 rounded-full object-cover"
            loading="lazy"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="line-clamp-2 text-sm font-semibold text-[var(--text)]">
            {video?.title || "Untitled"}
          </div>
          {showCreator && (
            <div className="mt-0.5 text-[12px] text-zinc-500 dark:text-zinc-400">
              {video?.creator?.name || "Anonymous Creator"}
            </div>
          )}
          <div className="mt-1 flex items-center gap-3 text-[12px] text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1" title="Views">
              <Eye size={14} />
              {formatNumber(video?.views || 0)}
            </span>
            <span className="inline-flex items-center gap-1" title="Likes">
              <Heart size={14} />
              {formatNumber(video?.likes || 0)}
            </span>
            {video?.createdAt && !isNaN(new Date(video.createdAt).getTime()) && (
              <span className="truncate">{new Date(video.createdAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

VideoCard.propTypes = {
  video: PropTypes.shape({
    title: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    thumbnail: PropTypes.string,
    creator: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    views: PropTypes.number,
    likes: PropTypes.number,
    createdAt: PropTypes.string,
    duration: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  showCreator: PropTypes.bool,
  compact: PropTypes.bool,
};
