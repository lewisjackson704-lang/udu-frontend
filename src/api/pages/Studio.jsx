import React from "react";
import StudioDashboard from "../components/Studio/StudioDashboard";
import EditorPanel from "../components/Studio/EditorPanel";
import AnimationTools from "../components/Studio/AnimationTools";
import { Settings, Upload, Video } from "lucide-react";

/**
 * Full Creator Studio layout
 * - Adaptive: switches automatically between light/dark themes.
 * - Combines dashboard, editor, and animation tools.
 * - Designed for clarity and breathing room.
 */

export default function Studio() {
  const handleAction = (action) => {
    try {
      console.info(`Action triggered: ${action}`);
    } catch (error) {
      console.error(`Failed to execute action: ${action}`, error);
    }
  };

  return (
    <div
      className="flex h-full w-full flex-col bg-white text-black transition-colors duration-300 dark:bg-black dark:text-white"
      role="main"
      aria-label="Creator Studio"
    >
      {/* Header */}
      <header
        className="flex items-center justify-between border-b border-black/10 bg-white/60 px-6 py-3 backdrop-blur-md dark:border-white/10 dark:bg-black/40"
        role="banner"
        aria-label="Studio Header"
      >
        <h2 className="text-xl font-bold text-amber-500 dark:text-amber-400">
          Creator Studio
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleAction("Upload")}
            className="flex items-center gap-2 rounded-xl border border-amber-400 bg-amber-400/10 px-3 py-1.5 text-sm font-semibold text-amber-600 hover:bg-amber-400/20 dark:text-amber-300"
            aria-label="Upload content"
          >
            <Upload size={16} aria-hidden="true" />
            Upload
          </button>
          <button
            onClick={() => handleAction("Go Live")}
            className="flex items-center gap-2 rounded-xl border border-amber-400 bg-amber-400/10 px-3 py-1.5 text-sm font-semibold text-amber-600 hover:bg-amber-400/20 dark:text-amber-300"
            aria-label="Go live"
          >
            <Video size={16} aria-hidden="true" />
            Go Live
          </button>
          <button
            onClick={() => handleAction("Settings")}
            className="flex items-center gap-2 rounded-xl border border-amber-400 bg-amber-400/10 px-3 py-1.5 text-sm font-semibold text-amber-600 hover:bg-amber-400/20 dark:text-amber-300"
            aria-label="Open settings"
          >
            <Settings size={16} aria-hidden="true" />
            Settings
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <main
        className="flex flex-1 flex-col gap-6 overflow-y-auto p-6 lg:flex-row lg:gap-8"
        role="region"
        aria-label="Main Studio Layout"
      >
        {/* Left column: Dashboard + Editor */}
        <section
          className="flex w-full flex-col gap-6 lg:w-2/3"
          role="region"
          aria-label="Dashboard and Editor Section"
        >
          <StudioDashboard />
          <EditorPanel />
        </section>

        {/* Right column: Animation + Tips */}
        <aside
          className="flex w-full flex-col gap-6 lg:w-1/3"
          role="complementary"
          aria-label="Animation Tools and Creator Tips"
        >
          <AnimationTools />

          {/* Creator Tips */}
          <div
            className="rounded-2xl border border-black/10 bg-amber-50/60 p-5 text-black dark:border-white/10 dark:bg-black/30 dark:text-white"
            role="region"
            aria-label="Creator Tips"
          >
            <h4 className="mb-2 text-lg font-semibold text-amber-500 dark:text-amber-400">
              Creator Tips
            </h4>
            <ul
              className="list-disc space-y-1 pl-5 text-sm text-black/80 dark:text-white/70"
              aria-label="Tips for creators"
            >
              <li>Engage with your fans during streams to boost retention.</li>
              <li>Short clips tend to trend faster than long sessions.</li>
              <li>Keep thumbnails simple — contrast wins clicks.</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
