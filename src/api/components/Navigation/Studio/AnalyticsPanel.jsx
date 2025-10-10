import React from "react";
import {
  BarChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { Eye, Heart, UserPlus, Clock, TrendingUp } from "lucide-react";

/**
 * AnalyticsPanel — U·DU Creator Insights
 * Clean, adaptive analytics visualization panel.
 * Integrates easily with StudioDashboard or can be a standalone page.
 */
export default function AnalyticsPanel() {
  // Example chart data
  const viewData = [
    { day: "Mon", views: 1200, watch: 200 },
    { day: "Tue", views: 2100, watch: 300 },
    { day: "Wed", views: 1850, watch: 260 },
    { day: "Thu", views: 2500, watch: 410 },
    { day: "Fri", views: 3100, watch: 520 },
    { day: "Sat", views: 2900, watch: 490 },
    { day: "Sun", views: 3400, watch: 610 },
  ];

  const engagementData = [
    { metric: "Likes", value: 540 },
    { metric: "Comments", value: 190 },
    { metric: "Shares", value: 85 },
    { metric: "Subs", value: 120 },
  ];

  return (
    <div
      className="rounded-2xl border border-amber-400/30 bg-black/50 p-6 text-white backdrop-blur-md shadow-md"
      aria-label="Creator analytics dashboard"
    >
      <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
        <TrendingUp size={20} aria-hidden="true" /> Creator Analytics
      </h3>

      {/* Quick KPIs */}
      <div
        className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6"
        role="region"
        aria-label="Key performance indicators"
      >
        {[
          { icon: Eye, label: "Total Views", value: "135K" },
          { icon: Clock, label: "Watch Time", value: "1,240 hrs" },
          { icon: Heart, label: "Likes", value: "5.2K" },
          { icon: UserPlus, label: "Subs Gained", value: "382" },
          { icon: TrendingUp, label: "Engagement", value: "8.4%" },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center rounded-xl border border-amber-400/20 bg-black/40 py-3 hover:bg-black/50 transition"
            aria-label={`${stat.label}: ${stat.value}`}
          >
            <stat.icon size={18} className="text-amber-400 mb-1" aria-hidden="true" />
            <div className="text-base font-semibold">{stat.value}</div>
            <div className="text-xs text-white/70">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Views Trend Line */}
      <div
        className="h-60 rounded-xl border border-amber-400/20 bg-black/30 p-3 mb-6"
        role="region"
        aria-label="Views per day chart"
      >
        <h4 className="text-sm text-amber-300 mb-2 font-semibold">Views per Day</h4>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={viewData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="day" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.7)",
                border: "1px solid #fbbf24",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#fbbf24"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Watch Time Area Chart */}
      <div
        className="h-60 rounded-xl border border-amber-400/20 bg-black/30 p-3 mb-6"
        role="region"
        aria-label="Watch time trend chart"
      >
        <h4 className="text-sm text-amber-300 mb-2 font-semibold">Watch Time Trend</h4>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={viewData}>
            <defs>
              <linearGradient id="amberFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="day" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.7)",
                border: "1px solid #fbbf24",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="watch"
              stroke="#fbbf24"
              fillOpacity={1}
              fill="url(#amberFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Engagement Breakdown */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        role="region"
        aria-label="Engagement breakdown"
      >
        {engagementData.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-amber-400/20 bg-black/40 p-3 text-center text-sm text-white/80 hover:bg-black/50"
            aria-label={`${item.metric}: ${item.value}`}
          >
            <div className="text-lg font-bold text-amber-400">{item.value}</div>
            <div className="text-xs text-white/70">{item.metric}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
