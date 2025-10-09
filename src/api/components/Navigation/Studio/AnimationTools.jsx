import React, { useState } from "react";
import PropTypes from "prop-types";
import { Sparkles, ToggleLeft, ToggleRight } from "lucide-react";

/**
 * Animation controls for transitions and effects.
 * Adaptive: dark/light background, amber accents.
 */
export default function AnimationTools() {
  const [enabled, setEnabled] = useState(false);

  // Handle toggle logic with error prevention
  const handleToggle = () => {
    try {
      setEnabled((prev) => !prev);
    } catch (error) {
      console.error("Error toggling animation controls:", error);
    }
  };

  return (
    <div
      className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 p-6 text-black dark:text-white transition-colors duration-300 backdrop-blur-md"
      role="region"
      aria-label="Animation Tools Panel"
    >
      {/* Header */}
      <h3 className="mb-4 text-lg font-semibold text-amber-500 dark:text-amber-400">
        Animation Tools
      </h3>

      {/* Toggle Control */}
      <div
        className="flex items-center justify-between rounded-xl border border-white/10 bg-white/40 dark:bg-black/40 px-4 py-3"
        role="group"
        aria-label="Enable or disable transitions"
      >
        <div className="flex items-center gap-2 text-sm">
          <Sparkles size={18} className="text-amber-400" aria-hidden="true" />
          <span>Enable Transitions</span>
        </div>
        <button
          onClick={handleToggle}
          className="text-amber-500 dark:text-amber-400"
          aria-label={enabled ? "Disable transitions" : "Enable transitions"}
        >
          {enabled ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
        </button>
      </div>

      {/* Animation Options */}
      {enabled && (
        <div
          className="mt-4 grid grid-cols-2 gap-3 text-sm"
          role="region"
          aria-label="Animation effects options"
        >
          {["Fade", "Slide", "Zoom", "Pop"].map((effect) => (
            <button
              key={effect}
              className="rounded-xl border border-amber-400/50 bg-white/30 dark:bg-black/40 px-3 py-2 font-semibold text-amber-500 dark:text-amber-400 hover:bg-amber-400/10"
              onClick={() => console.info(`Effect selected: ${effect}`)}
              aria-label={`Select ${effect} effect`}
            >
              {effect}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

AnimationTools.propTypes = {
  enabled: PropTypes.bool,
};
