import React, { useState } from "react";
import PropTypes from "prop-types";
import { Scissors, Save, PlayCircle, RefreshCw } from "lucide-react";

/**
 * Lightweight in-browser editor panel.
 * Provides cut, trim, preview, and save controls.
 */
export default function EditorPanel() {
  const [progress, setProgress] = useState(0);

  // Handles progress bar updates with error prevention
  const handleSaveProgress = () => {
    try {
      setProgress((prev) => {
        if (prev < 100) return prev + 10;
        return 0; // Reset progress
      });
    } catch (error) {
      console.error("Error while updating progress:", error);
    }
  };

  // Handles reset logic
  const handleReset = () => {
    try {
      setProgress(0);
      console.info("Reset progress to 0.");
    } catch (error) {
      console.error("Error while resetting progress:", error);
    }
  };

  return (
    <div
      className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 p-6 backdrop-blur-md transition-colors duration-300 text-black dark:text-white"
      role="region"
      aria-label="Video Editor Panel"
    >
      <h3 className="mb-4 text-lg font-semibold text-amber-500 dark:text-amber-400">
        Quick Editor
      </h3>

      {/* Preview Box */}
      <div
        className="mb-4 aspect-video w-full rounded-xl border border-white/10 bg-black/10 dark:bg-black/70 flex items-center justify-center text-sm text-white/70"
        role="region"
        aria-label="Video Preview Area"
      >
        Video Preview Area
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          className="flex items-center gap-2 rounded-xl border border-amber-400 px-3 py-2 text-sm font-semibold text-amber-500 dark:text-amber-400 hover:bg-amber-400/10"
          aria-label="Trim Video"
          onClick={() => console.info("Trim action triggered.")}
        >
          <Scissors size={16} aria-hidden="true" /> Trim
        </button>
        <button
          className="flex items-center gap-2 rounded-xl border border-amber-400 px-3 py-2 text-sm font-semibold text-amber-500 dark:text-amber-400 hover:bg-amber-400/10"
          aria-label="Preview Video"
          onClick={() => console.info("Preview action triggered.")}
        >
          <PlayCircle size={16} aria-hidden="true" /> Preview
        </button>
        <button
          onClick={handleSaveProgress}
          className="flex items-center gap-2 rounded-xl border border-amber-400 px-3 py-2 text-sm font-semibold text-amber-500 dark:text-amber-400 hover:bg-amber-400/10"
          aria-label="Save Progress"
        >
          <Save size={16} aria-hidden="true" /> Save
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 rounded-xl border border-amber-400 px-3 py-2 text-sm font-semibold text-amber-500 dark:text-amber-400 hover:bg-amber-400/10"
          aria-label="Reset Progress"
        >
          <RefreshCw size={16} aria-hidden="true" /> Reset
        </button>
      </div>

      {/* Progress Bar */}
      <div
        className="mt-4 h-2 w-full rounded-full bg-white/10 dark:bg-white/20"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress Indicator"
      >
        <div
          className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

EditorPanel.propTypes = {
  progress: PropTypes.number,
};
