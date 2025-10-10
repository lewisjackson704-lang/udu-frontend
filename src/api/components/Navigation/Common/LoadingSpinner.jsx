import React from "react";
import PropTypes from "prop-types";

/**
 * LoadingSpinner — minimal amber-glow loading animation.
 * - Dual adaptive
 */
export default function LoadingSpinner({ size = 32 }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    >
      <div
        className="animate-spin rounded-full border-4 border-amber-400 border-t-transparent"
        style={{ width: size, height: size }}
      />
    </div>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.number, // The size of the spinner in pixels
};
