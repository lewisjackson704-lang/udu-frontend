import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * ProgressBar
 * - Top sticky loading bar.
 * - Controlled (progress 0–100) or indeterminate mode.
 */
export default function ProgressBar({ progress = 0, indeterminate = false }) {
  const [pos, setPos] = useState(0);

  // Indeterminate animation loop
  useEffect(() => {
    if (!indeterminate) return;
    let raf;
    const loop = () => {
      setPos((p) => (p >= 100 ? 0 : p + 1.5));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [indeterminate]);

  // Calculate width
  const width = indeterminate ? `${pos}%` : `${Math.min(100, Math.max(0, progress))}%`;

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-50 h-0.5 bg-transparent"
      role="progressbar"
      aria-valuenow={indeterminate ? null : progress}
      aria-valuemin={indeterminate ? null : 0}
      aria-valuemax={indeterminate ? null : 100}
      aria-hidden={indeterminate ? "true" : "false"}
    >
      <div
        className="h-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-[0_0_10px_rgba(245,197,24,0.6)]"
        style={{ width }}
      />
    </div>
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.number, // Controlled progress value between 0–100
  indeterminate: PropTypes.bool, // Whether the bar is in indeterminate mode
};
