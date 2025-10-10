import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import StudioDashboard from "../components/Studio/StudioDashboard.jsx";
import EditorPanel from "../components/Studio/EditorPanel.jsx";
import AnimationTools from "../components/Studio/AnimationTools.jsx";
import { Video, Wand2, Sparkles } from "lucide-react";

/**
 * Studio Page — U·DU Creator Workspace
 * Combines Uploads, Analytics, Editor, and Animator in one adaptive view.
 */
export default function Studio() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Video },
    { id: "edit", label: "Editor", icon: Wand2 },
    { id: "animate", label: "Animator", icon: Sparkles },
  ];

  return (
    <div
      className="flex min-h-screen flex-col bg-gradient-to-b from-black via-neutral-900 to-black text-white"
      aria-label="U·DU Creator Studio"
    >
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-black/50 px-4 py-3 backdrop-blur-md">
        <h1 className="text-xl font-bold text-amber-400">U·DU Studio</h1>
        {user && (
          <div className="flex items-center gap-2 text-sm text-white/70">
            <span>Signed in as</span>
            <span className="font-semibold text-amber-300">
              {user.username || user.email}
            </span>
          </div>
        )}
      </header>

      {/* Navigation Tabs */}
      <nav
        className="flex justify-center gap-4 border-b border-white/10 bg-black/40 py-2 backdrop-blur-md"
        aria-label="Studio navigation"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-all ${
              activeTab === tab.id
                ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                : "text-white/60 hover:text-amber-300"
            }`}
            aria-label={`Switch to ${tab.label}`}
            aria-current={activeTab === tab.id ? "page" : undefined}
          >
            <tab.icon size={16} aria-hidden="true" />
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main
        className="flex-1 overflow-y-auto p-4 sm:p-6"
        aria-live="polite"
        aria-atomic="true"
      >
        {activeTab === "dashboard" && <StudioDashboard user={user} />}
        {activeTab === "edit" && (
          <div className="max-w-6xl mx-auto">
            <EditorPanel />
          </div>
        )}
        {activeTab === "animate" && (
          <div className="max-w-6xl mx-auto">
            <AnimationTools />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 bg-black/40 py-3 text-center text-xs text-white/50 backdrop-blur-md">
        © {new Date().getFullYear()} U·DU — Creator Studio
      </footer>
    </div>
  );
}
