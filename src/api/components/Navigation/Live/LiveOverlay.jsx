import React from "react";
import PropTypes from "prop-types";
import { Users } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Minimal overlay that sits on top of the stream.
 * Amber LIVE badge + viewer count, localization-ready.
 */
function LiveOverlay({
  title = "",
  live = true,
  viewers = 0,
  className = "",
  locale = "en-US",
  liveText = "LIVE",
  animateLive = true,
}) {
  const formattedViewers = Intl.NumberFormat(locale).format(viewers);

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      {/* Top gradient for readability */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />

      {/* LIVE Badge and Viewer Count */}
      <div className="absolute left-3 top-3 flex flex-col gap-2">
        {live && (
          animateLive ? (
            <motion.div
              role="status"
              aria-live="polite"
              initial={{ opacity: 0.9 }}
              animate={{ opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-amber-400/60 bg-black/55 px-3 py-1 text-xs font-bold text-amber-300 shadow-[0_0_12px_rgba(255,213,79,0.35)] backdrop-blur-md"
            >
              <span 
                className="inline-block h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_10px_2px_rgba(255,213,79,0.7)]" 
                aria-hidden="true" 
              />
              {liveText}
            </motion.div>
          ) : (
            <div
              role="status"
              aria-live="polite"
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-amber-400/60 bg-black/55 px-3 py-1 text-xs font-bold text-amber-300 shadow-[0_0_12px_rgba(255,213,79,0.35)] backdrop-blur-md"
            >
              <span 
                className="inline-block h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_10px_2px_rgba(255,213,79,0.7)]" 
                aria-hidden="true" 
              />
              {liveText}
            </div>
          )
        )}

        <div
          className="pointer-events-auto inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/45 px-2.5 py-1 text-[11px] text-white/85 backdrop-blur-md"
          aria-label={`${formattedViewers} viewers`}
        >
          <Users size={14} className="opacity-80" />
          <span>{formattedViewers}</span>
        </div>
      </div>

      {/* Stream Title */}
      {title && (
        <div className="absolute bottom-3 left-3 right-3">
          <div
            className="inline-block max-w-[80%] truncate rounded-xl border border-white/10 bg-black/40 px-3 py-1.5 text-sm font-semibold text-white/95 backdrop-blur-md"
            aria-label={`Stream title: ${title}`}
          >
            {title}
          </div>
        </div>
      )}
    </div>
  );
}

LiveOverlay.propTypes = {
  title: PropTypes.string,
  live: PropTypes.bool,
  viewers: PropTypes.number,
  className: PropTypes.string,
  locale: PropTypes.string,
  liveText: PropTypes.string,
  animateLive: PropTypes.bool,
};

export default LiveOverlay;
