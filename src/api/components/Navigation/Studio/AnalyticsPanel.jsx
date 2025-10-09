import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { TrendingUp, Users, Eye, Heart } from "lucide-react";

/**
 * AnalyticsPanel — U·DU Creator Analytics Dashboard
 * Dual adaptive (light/dark) with amber accent data visuals.
 */
export default function AnalyticsPanel() {
  // Example data; these can be fetched dynamically from the backend
  const viewData = [
    { day: "Mon", views: 2300 },
    { day: "Tue", views: 3200 },
    { day: "Wed", views: 4100 },
    { day: "Thu", views: 3800 },
    { day: "Fri", views: 4700 },
    { day: "Sat", views: 5100 },
    { day: "Sun", views: 4200 },
  ];

  const engagementData = [
    { label: "Likes", value: 12500, icon: <Heart className="text-amber-400" aria-hidden="true" /> },
    { label: "Followers", value: 4600, icon: <Users className="text-amber-400" aria-hidden="true" /> },
    { label: "Watch Hours", value: 890, icon: <Eye className="text-amber-400" aria-hidden="true" /> },
    { label: "Growth", value: "+17%", icon: <TrendingUp className="text-amber-400" aria-hidden="true" /> },
  ];

  return (
    <div
      className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 p-6 backdrop-blur-md transition-colors duration-300 text-black dark:text-white"
      role="region"
      aria-label="Channel Analytics Panel"
    >
      <h3 className="mb-4 text-lg font-semibold text-amber-500 dark:text-amber-400">
        Channel Analytics
      </h3>

      {/* Key Metrics */}
      <div
        className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4"
        role="region"
        aria-label="Key engagement metrics"
      >
        {engagementData.map((e, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-1 rounded-xl border border-amber-300/30 bg-white/50 p-3 text-center shadow-sm dark:bg-black/40"
            role="article"
            aria-label={`${e.label}: ${e.value}`}
          >
            <div className="text-amber-500 dark:text-amber-400">{e.icon}</div>
            <div className="text-lg font-semibold">{e.value}</div>
            <div className="text-xs text-black/60 dark:text-white/70">{e.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Line Chart */}
        <div
          className="rounded-xl border border-white/10 bg-white/40 dark:bg-black/40 p-4"
          role="region"
          aria-label="Weekly Views Line Chart"
        >
          <h4 className="mb-3 text-sm font-semibold text-amber-500 dark:text-amber-400">
            Views This Week
          </h4>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={viewData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#666" opacity={0.2} />
              <XAxis dataKey="day" stroke="currentColor" opacity={0.5} />
              <YAxis stroke="currentColor" opacity={0.5} />
              <Tooltip
                contentStyle={{
                  background: "#1f1f1f",
                  border: "1px solid rgba(255,213,79,0.3)",
                  color: "white",
                }}
                labelStyle={{ color: "#FBBF24" }}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#FBBF24"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#FBBF24" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div
          className="rounded-xl border border-white/10 bg-white/40 dark:bg-black/40 p-4"
          role="region"
          aria-label="Daily Engagement Bar Chart"
        >
          <h4 className="mb-3 text-sm font-semibold text-amber-500 dark:text-amber-400">
            Engagement by Day
          </h4>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={viewData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#666" opacity={0.2} />
              <XAxis dataKey="day" stroke="currentColor" opacity={0.5} />
              <YAxis stroke="currentColor" opacity={0.5} />
              <Tooltip
                contentStyle={{
                  background: "#1f1f1f",
                  border: "1px solid rgba(255,213,79,0.3)",
                  color: "white",
                }}
                labelStyle={{ color: "#FBBF24" }}
              />
              <Bar dataKey="views" fill="#FBBF24" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
