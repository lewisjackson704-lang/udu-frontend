import React, { useRef, useState } from "react";
import { Scissors, Volume2, Crop, Filter, Save, Loader2 } from "lucide-react";

/**
 * VideoEditor — Core video editing panel
 * Allows trimming, volume control, and filter preview before saving.
 * (Uses built-in HTML5 video controls + canvas for preview.)
 */
export default function VideoEditor({ videoUrl, onSave, onCancel }) {
  const videoRef = useRef(null);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [volume, setVolume] = useState(1);
  const [filter, setFilter] = useState("none");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (trimStart >= trimEnd) {
      alert("Please ensure that the trim start time is less than the trim end time.");
      return;
    }

    try {
      setSaving(true);
      // Simulate a save operation
      setTimeout(() => {
        setSaving(false);
        alert("Video edits saved successfully!");
        onSave?.();
      }, 1500);
    } catch (err) {
      console.error("Error saving video edits:", err);
      alert("Error saving video edits. Please try again.");
      setSaving(false);
    }
  };

  const filters = [
    { label: "None", value: "none" },
    { label: "Grayscale", value: "grayscale(100%)" },
    { label: "Sepia", value: "sepia(70%)" },
    { label: "Contrast Boost", value: "contrast(130%)" },
    { label: "Cool Tone", value: "hue-rotate(180deg)" },
  ];

  return (
    <div
      className="rounded-2xl border border-amber-400/30 bg-black/70 p-6 text-white shadow-xl backdrop-blur-md"
      aria-label="Video editor panel"
    >
      <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
        <Scissors size={20} aria-hidden="true" /> Edit Video
      </h3>

      {/* Video Preview */}
      <div
        className="relative w-full rounded-xl border border-white/10 bg-black/40 overflow-hidden mb-4"
        aria-label="Video preview"
      >
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          className="w-full max-h-[400px] rounded-lg"
          style={{ filter }}
          onLoadedMetadata={(e) => setTrimEnd(e.target.duration)}
        ></video>
      </div>

      {/* Trim Controls */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-white/60" htmlFor="trim-start">
            Trim Start (sec)
          </label>
          <input
            id="trim-start"
            type="number"
            min="0"
            max={trimEnd}
            value={trimStart}
            onChange={(e) => setTrimStart(parseFloat(e.target.value))}
            className="w-full rounded-md bg-black/40 border border-white/20 px-2 py-1 text-white text-sm focus:border-amber-400"
            aria-label="Set trim start time"
          />
        </div>
        <div>
          <label className="text-xs text-white/60" htmlFor="trim-end">
            Trim End (sec)
          </label>
          <input
            id="trim-end"
            type="number"
            min={trimStart}
            value={trimEnd}
            onChange={(e) => setTrimEnd(parseFloat(e.target.value))}
            className="w-full rounded-md bg-black/40 border border-white/20 px-2 py-1 text-white text-sm focus:border-amber-400"
            aria-label="Set trim end time"
          />
        </div>
      </div>

      {/* Volume Control */}
      <div className="mb-4">
        <label className="text-xs text-white/60 flex items-center gap-2">
          <Volume2 size={14} aria-hidden="true" /> Volume
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setVolume(v);
            if (videoRef.current) videoRef.current.volume = v;
          }}
          className="w-full accent-amber-400 mt-1"
          aria-label="Adjust video volume"
        />
      </div>

      {/* Filter Selection */}
      <div className="mb-6">
        <label className="text-xs text-white/60 flex items-center gap-2 mb-1">
          <Filter size={14} aria-hidden="true" /> Filter
        </label>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-lg border px-3 py-1 text-xs transition ${
                filter === f.value
                  ? "border-amber-400 bg-amber-400/20 text-amber-300"
                  : "border-white/10 bg-black/30 text-white/60 hover:border-amber-400/30"
              }`}
              aria-label={`Apply ${f.label} filter`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="rounded-lg border border-white/20 bg-transparent px-4 py-2 text-sm text-white/70 hover:bg-white/10"
          aria-label="Cancel video edits"
        >
          Cancel
        </button>
        <button
          disabled={saving}
          onClick={handleSave}
          className="flex items-center gap-2 rounded-lg border border-amber-400 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20 disabled:opacity-60"
          aria-label="Save video edits"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
