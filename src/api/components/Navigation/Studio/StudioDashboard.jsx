import React, { useState } from "react";
import { Plus, Video, BarChart3, TrendingUp, Clock } from "lucide-react";
import AnalyticsPanel from "./AnalyticsPanel.jsx";
import VideoManager from "./VideoManager.jsx";
import UploadModal from "../Video/UploadModal.jsx";
import VideoEditor from "./VideoEditor.jsx";
import AnimationTools from "./AnimationTools.jsx";

/**
 * StudioDashboard — Unified creator hub:
 * - KPIs
 * - AnalyticsPanel
 * - VideoManager (with Edit/Animate hooks)
 * - Upload flow (UploadModal)
 * - Editor flow (VideoEditor)
 * - Animation flow (AnimationTools)
 */
export default function StudioDashboard({ user }) {
  const [showUpload, setShowUpload] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showAnimator, setShowAnimator] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null); // { id, title, url, thumbnail }

  const kpis = [
    { icon: Video, label: "Total Uploads", value: 42 },
    { icon: TrendingUp, label: "Total Views", value: "135K" },
    { icon: BarChart3, label: "Engagement", value: "8.4%" },
    { icon: Clock, label: "Watch Time", value: "1,240 hrs" },
  ];

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setShowEditor(true);
  };

  const handleAnimate = (video) => {
    setSelectedVideo(video);
    setShowAnimator(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-400">
          Welcome back, {user?.name || "Creator"} ✨
        </h2>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 rounded-xl border border-amber-400 bg-amber-400/10 px-3 py-1.5 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
          aria-label="Upload a new video"
        >
          <Plus size={16} /> New Upload
        </button>
      </header>

      {/* KPI Cards */}
      <section
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        aria-label="Key performance indicators"
      >
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center rounded-xl border border-amber-400/30 bg-black/40 p-4 text-center text-white backdrop-blur-md shadow-md hover:shadow-lg transition"
            aria-label={`${kpi.label}: ${kpi.value}`}
          >
            <kpi.icon size={22} className="text-amber-400 mb-2" />
            <div className="text-lg font-semibold">{kpi.value}</div>
            <div className="text-xs text-white/70">{kpi.label}</div>
          </div>
        ))}
      </section>

      {/* Analytics */}
      <AnalyticsPanel />

      {/* Video Manager */}
      <VideoManager onEdit={handleEdit} onAnimate={handleAnimate} />

      {/* Upload Modal */}
      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          aria-label="Upload video modal"
        />
      )}

      {/* Video Editor */}
      {showEditor && selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`Editing video: ${selectedVideo.title}`}
        >
          <div
            onClick={() => setShowEditor(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="relative w-[95%] max-w-4xl">
            <VideoEditor
              videoUrl={selectedVideo.url}
              onSave={() => setShowEditor(false)}
              onCancel={() => setShowEditor(false)}
            />
          </div>
        </div>
      )}

      {/* Animation Tools */}
      {showAnimator && selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`Animating video: ${selectedVideo.title}`}
        >
          <div
            onClick={() => setShowAnimator(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="relative w-[95%] max-w-4xl">
            <AnimationTools
              videoUrl={selectedVideo.url}
              onSave={() => setShowAnimator(false)}
              onCancel={() => setShowAnimator(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
