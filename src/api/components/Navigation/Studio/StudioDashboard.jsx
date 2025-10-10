import React from "react";
import { BarChart3, TrendingUp, Video, Clock } from "lucide-react";

/**
 * StudioDashboard — Overview of creator performance
 * Displays video stats, quick links, and analytics summaries.
 */
export default function StudioDashboard({ user }) {
  const stats = [
    { icon: Video, label: "Total Uploads", value: 42 },
    { icon: TrendingUp, label: "Total Views", value: "135K" },
    { icon: BarChart3, label: "Engagement Rate", value: "8.4%" },
    { icon: Clock, label: "Watch Time", value: "1,240 hrs" },
  ];

  return (
    <div className="space-y-6" aria-label="Creator Studio Dashboard">
      <h2 className="text-2xl font-bold text-amber-400">
        Welcome back, {user?.name || "Creator"} ✨
      </h2>

      {/* Stats Grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        role="region"
        aria-label="Key performance statistics"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center rounded-xl border border-amber-400/30 bg-black/40 p-4 text-center text-white backdrop-blur-md shadow-md hover:shadow-lg transition"
            aria-label={`${stat.label}: ${stat.value}`}
          >
            <stat.icon size={24} className="text-amber-400 mb-2" aria-hidden="true" />
            <div className="text-lg font-semibold">{stat.value}</div>
            <div className="text-xs text-white/70">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Performance Summary */}
      <div
        className="rounded-2xl border border-amber-400/30 bg-black/50 p-6 text-sm text-white/80 backdrop-blur-md"
        role="region"
        aria-label="Performance summary"
      >
        <h3 className="mb-3 text-lg font-semibold text-amber-300">Performance Summary</h3>
        <p>
          Your recent uploads are performing <strong>12% better</strong> than last week! Keep
          up the consistency — your fans are loving the new format.
        </p>
      </div>
    </div>
  );
}
