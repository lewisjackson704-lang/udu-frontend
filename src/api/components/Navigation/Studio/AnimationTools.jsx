import React, { useState } from "react";
import { Sparkles, Type, Zap, Image, Save } from "lucide-react";

/**
 * AnimationTools — FX and motion graphic editor.
 * Adds text overlays, stickers, transitions, etc.
 */
export default function AnimationTools() {
  const [activeFX, setActiveFX] = useState("transitions");

  const fxList = [
    { id: "transitions", label: "Transitions", icon: Zap },
    { id: "stickers", label: "Stickers", icon: Image },
    { id: "text", label: "Text Overlays", icon: Type },
    { id: "effects", label: "Effects", icon: Sparkles },
  ];

  return (
    <div
      className="rounded-2xl border border-amber-400/30 bg-black/50 p-4 text-white backdrop-blur-md shadow-md"
      aria-label="FX and Animation Studio"
    >
      <h3 className="mb-3 text-lg font-semibold text-amber-400">FX & Animation Studio</h3>

      {/* Tool Switcher */}
      <div
        className="mb-4 flex gap-2 overflow-x-auto"
        role="tablist"
        aria-label="Animation tools"
      >
        {fxList.map((fx) => (
          <button
            key={fx.id}
            onClick={() => setActiveFX(fx.id)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
              activeFX === fx.id
                ? "bg-amber-400/20 border border-amber-400/40 text-amber-300"
                : "text-white/70 hover:text-amber-300"
            }`}
            role="tab"
            aria-selected={activeFX === fx.id}
            aria-controls={`fx-panel-${fx.id}`}
          >
            <fx.icon size={16} aria-hidden="true" /> {fx.label}
          </button>
        ))}
      </div>

      {/* FX Workspace */}
      <div
        id={`fx-panel-${activeFX}`}
        className="rounded-xl border border-white/10 bg-black/40 p-4 min-h-[200px]"
        role="tabpanel"
        aria-labelledby={`tab-${activeFX}`}
      >
        {activeFX === "transitions" && (
          <p className="text-sm text-white/70">
            Add crossfade, slide, and blur transitions between clips.
          </p>
        )}
        {activeFX === "stickers" && (
          <p className="text-sm text-white/70">
            Drag and drop animated stickers onto your video.
          </p>
        )}
        {activeFX === "text" && (
          <p className="text-sm text-white/70">
            Customize captions, subtitles, and creative titles.
          </p>
        )}
        {activeFX === "effects" && (
          <p className="text-sm text-white/70">
            Apply cinematic glows, slow-motion, and color flares.
          </p>
        )}
      </div>

      {/* Save FX */}
      <div className="mt-4 text-right">
        <button
          className="inline-flex items-center gap-2 rounded-lg border border-amber-400 bg-amber-400/10 px-3 py-1.5 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
          aria-label="Save animation effects"
        >
          <Save size={14} aria-hidden="true" /> Save FX
        </button>
      </div>
    </div>
  );
}
