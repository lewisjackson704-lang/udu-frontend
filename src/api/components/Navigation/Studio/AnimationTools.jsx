import React, { useRef, useState } from "react";
import { Sparkles, Type, Image, Save, Loader2, X } from "lucide-react";

/**
 * AnimationTools — Visual layer for creators to enhance videos.
 * Provides transitions, stickers, motion text, and overlay previews.
 */
export default function AnimationTools({ videoUrl, onSave, onCancel }) {
  const videoRef = useRef(null);
  const [activeEffect, setActiveEffect] = useState("none");
  const [overlayText, setOverlayText] = useState("");
  const [sticker, setSticker] = useState("");
  const [saving, setSaving] = useState(false);

  const effects = [
    { id: "none", label: "None", style: "" },
    { id: "fade", label: "Fade In/Out", style: "fade" },
    { id: "zoom", label: "Zoom", style: "zoom" },
    { id: "shake", label: "Shake", style: "shake" },
    { id: "glow", label: "Amber Glow", style: "glow" },
  ];

  const stickers = ["🔥", "💫", "🎵", "😂", "💖", "🎮", "🎬"];

  const handleSave = async () => {
    if (!videoRef.current) {
      alert("No video loaded. Please upload a valid video.");
      return;
    }

    setSaving(true);
    // Simulate saving animations
    setTimeout(() => {
      alert("Animations saved successfully!");
      setSaving(false);
      onSave?.();
    }, 1500);
  };

  return (
    <div
      className="rounded-2xl border border-amber-400/30 bg-black/70 p-6 text-white shadow-xl backdrop-blur-md"
      aria-label="Video animation tools panel"
    >
      <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
        <Sparkles size={20} aria-hidden="true" /> Animation Tools
      </h3>

      {/* Video Preview */}
      <div
        className="relative w-full rounded-xl border border-white/10 bg-black/40 overflow-hidden mb-4"
        aria-label="Video preview with animations"
      >
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          className={`w-full max-h-[400px] object-cover rounded-lg transition-all duration-700 ${
            activeEffect === "fade"
              ? "animate-fade"
              : activeEffect === "zoom"
              ? "animate-zoom"
              : activeEffect === "shake"
              ? "animate-shake"
              : activeEffect === "glow"
              ? "animate-glow"
              : ""
          }`}
        ></video>

        {/* Overlay Text */}
        {overlayText && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            aria-label="Overlay text preview"
          >
            <h2 className="text-3xl font-bold text-amber-400 drop-shadow-[0_0_10px_#fbbf24] animate-fade-in">
              {overlayText}
            </h2>
          </div>
        )}

        {/* Sticker */}
        {sticker && (
          <div
            className="absolute top-4 right-4 text-4xl animate-float"
            aria-label="Sticker preview"
          >
            {sticker}
          </div>
        )}
      </div>

      {/* Effects Selection */}
      <div className="mb-4">
        <label className="text-xs text-white/60 mb-1 block">Effect</label>
        <div className="flex flex-wrap gap-2">
          {effects.map((fx) => (
            <button
              key={fx.id}
              onClick={() => setActiveEffect(fx.id)}
              className={`rounded-lg border px-3 py-1 text-xs transition ${
                activeEffect === fx.id
                  ? "border-amber-400 bg-amber-400/20 text-amber-300"
                  : "border-white/10 bg-black/30 text-white/60 hover:border-amber-400/30"
              }`}
              aria-label={`Apply ${fx.label} effect`}
            >
              {fx.label}
            </button>
          ))}
        </div>
      </div>

      {/* Text Overlay */}
      <div className="mb-4">
        <label className="text-xs text-white/60 flex items-center gap-2">
          <Type size={14} aria-hidden="true" /> Overlay Text
        </label>
        <input
          value={overlayText}
          onChange={(e) => setOverlayText(e.target.value)}
          placeholder="Add your message..."
          className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white focus:border-amber-400 outline-none"
          aria-label="Add overlay text"
        />
        {overlayText && (
          <button
            onClick={() => setOverlayText("")}
            className="mt-1 text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
            aria-label="Remove overlay text"
          >
            <X size={12} aria-hidden="true" /> Remove Text
          </button>
        )}
      </div>

      {/* Stickers */}
      <div className="mb-6">
        <label className="text-xs text-white/60 flex items-center gap-2 mb-1">
          <Image size={14} aria-hidden="true" /> Stickers
        </label>
        <div className="flex flex-wrap gap-2">
          {stickers.map((s, i) => (
            <button
              key={i}
              onClick={() => setSticker(sticker === s ? "" : s)}
              className={`text-2xl rounded-lg p-2 transition ${
                sticker === s ? "bg-amber-400/30" : "hover:bg-black/40"
              }`}
              aria-label={`Select sticker ${s}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="rounded-lg border border-white/20 bg-transparent px-4 py-2 text-sm text-white/70 hover:bg-white/10"
          aria-label="Cancel animations"
        >
          Cancel
        </button>
        <button
          disabled={saving}
          onClick={handleSave}
          className="flex items-center gap-2 rounded-lg border border-amber-400 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20 disabled:opacity-60"
          aria-label="Save animations"
        >
          {saving ? <Loader
