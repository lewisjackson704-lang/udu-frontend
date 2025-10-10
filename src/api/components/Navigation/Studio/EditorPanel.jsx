import React, { useState } from "react";
import { Scissors, Volume2, SlidersHorizontal, Palette, Check } from "lucide-react";

/**
 * EditorPanel — Core video editing interface.
 * Non-destructive editor for trim, filters, and sound adjustments.
 */
export default function EditorPanel() {
  const [activeTool, setActiveTool] = useState("trim");

  const tools = [
    { id: "trim", label: "Trim", icon: Scissors },
    { id: "filters", label: "Filters", icon: Palette },
    { id: "audio", label: "Audio", icon: Volume2 },
    { id: "adjust", label: "Adjust", icon: SlidersHorizontal },
  ];

  return (
    <div
      className="rounded-2xl border border-amber-400/30 bg-black/50 p-4 text-white backdrop-blur-md shadow-md"
      aria-label="Video editor panel"
    >
      <h3 className="mb-3 text-lg font-semibold text-amber-400">Video Editor</h3>

      {/* Tool Tabs */}
      <div
        className="mb-4 flex gap-2 overflow-x-auto"
        role="tablist"
        aria-label="Editor tools"
      >
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
              activeTool === tool.id
                ? "bg-amber-400/20 border border-amber-400/40 text-amber-300"
                : "text-white/70 hover:text-amber-300"
            }`}
            role="tab"
            aria-selected={activeTool === tool.id}
            aria-controls={`editor-${tool.id}`}
          >
            <tool.icon size={16} aria-hidden="true" /> {tool.label}
          </button>
        ))}
      </div>

      {/* Editor Area */}
      <div
        id={`editor-${activeTool}`}
        className="rounded-xl border border-white/10 bg-black/40 p-4 min-h-[200px]"
        role="tabpanel"
        aria-labelledby={`tool-${activeTool}`}
      >
        {activeTool === "trim" && (
          <p className="text-sm text-white/70">
            Use the timeline below to trim your clip length.
          </p>
        )}
        {activeTool === "filters" && (
          <p className="text-sm text-white/70">
            Apply cinematic or color filters to enhance your content.
          </p>
        )}
        {activeTool === "audio" && (
          <p className="text-sm text-white/70">
            Adjust your audio balance and background music.
          </p>
        )}
        {activeTool === "adjust" && (
          <p className="text-sm text-white/70">
            Fine-tune brightness, contrast, and saturation.
          </p>
        )}
      </div>

      {/* Save Changes */}
      <div className="mt-4 text-right">
        <button
          className="inline-flex items-center gap-2 rounded-lg border border-amber-400 bg-amber-400/10 px-3 py-1.5 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
          aria-label="Save video changes"
        >
          <Check size={14} aria-hidden="true" /> Save Changes
        </button>
      </div>
    </div>
  );
}
