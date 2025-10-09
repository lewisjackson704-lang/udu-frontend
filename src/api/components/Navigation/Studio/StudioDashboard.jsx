import React from "react";
import PropTypes from "prop-types";
import { BarChart3, Upload, Video, Settings, DollarSign } from "lucide-react";

/**
 * Adaptive creator studio dashboard.
 * Shows stats, quick actions, and overview panels.
 */
export default function StudioDashboard() {
  const stats = [
    { label: "Total Views", value: "128K", icon: <Video className="text-amber-400" aria-hidden="true" /> },
    { label: "Subscribers", value: "4.7K", icon: <BarChart3 className="text-amber-400" aria-hidden="true" /> },
    { label: "Earnings", value: "$2,340", icon: <DollarSign className="text-amber-400" aria-hidden="true" /> },
  ];

  const actions = [
    {
      label: "Upload Video",
      icon: <Upload aria-hidden="true" />,
      onClick: () => console.info("Upload clicked"),
    },
    {
      label: "Go Live",
      icon: <Video aria-hidden="true" />,
      onClick: () => console.info("Go Live clicked"),
    },
    {
      label: "Edit Profile",
      icon: <Settings aria-hidden="true" />,
      onClick: () => console.info("Settings clicked"),
    },
  ];

  return (
    <div
      className="flex flex-col gap-6 p-6 transition-colors duration-300 bg-white dark:bg-black text-black dark:text-white"
      role="main"
      aria-label="Creator Studio Dashboard"
    >
      {/* Header */}
      <h2 className="text-2xl font-bold text-amber-500 dark:text-amber-400">
        Creator Studio
      </h2>

      {/* Stats */}
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        role="region"
        aria-label="Statistics Overview"
      >
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-black/10 dark:border-white/10 bg-amber-50 dark:bg-black/30 p-4 shadow-md transition hover:shadow-lg"
            role="article"
            aria-label={`${s.label}: ${s.value}`}
          >
            <div className="text-amber-500 dark:text-amber-400">{s.icon}</div>
            <div className="text-xl font-semibold">{s.value}</div>
            <div className="text-sm text-black/70 dark:text-white/70">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div
        className="mt-6 flex flex-wrap justify-center gap-4"
        role="region"
        aria-label="Quick Actions"
      >
        {actions.map((a, idx) => (
          <button
            key={idx}
            onClick={() => {
              try {
                a.onClick?.();
              } catch (error) {
                console.error(`Failed to perform action: ${a.label}`, error);
              }
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-amber-400 bg-gradient-to-r from-amber-400 to-yellow-300 px-4 py-2 font-semibold text-black transition hover:scale-105 dark:from-amber-400 dark:to-amber-500"
            aria-label={`Perform action: ${a.label}`}
          >
            {a.icon}
            {a.label}
          </button>
        ))}
      </div>
    </div>
  );
}

StudioDashboard.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
    })
  ),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ),
};
