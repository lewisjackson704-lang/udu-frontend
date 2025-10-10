import React from "react";
import { useStream } from "../../api/context/StreamContext.jsx";
import { Heart, DollarSign, Flag } from "lucide-react";

export default function LiveSidebar({ user }) {
  const { streamInfo, viewerCount } = useStream();

  return (
    <aside
      className="w-full sm:w-64 bg-black/60 rounded-xl-col gap-3 text-white"
      aria-label="Live stream sidebar"
    >
      {/* Streamer Info */}
      <div className="flex items-center gap-3">
        <img
          src={user?.avatar || "/logo192.png"}
          alt={`${user?.name || "Streamer"} avatar`}
          className="h-12 w-12 rounded-full border border-amber-400/50"
        />
        <div>
          <p className="font-semibold text-lg text-amber-300">{user?.name || "Streamer"}</p>
          <p className="text-xs text-white/60" aria-label={`${viewerCount} viewers`}>
            {viewerCount} watching
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 my-2"></div>

      {/* Stream Info */}
      <div>
        <p className="text-sm font-medium text-white/90" aria-label={`Stream title: ${streamInfo.title || "Untitled Stream"}`}>
          {streamInfo.title || "Untitled Stream"}
        </p>
        <p className="text-xs text-white/50" aria-label={`Stream category: ${streamInfo.category || "No category"}`}>
          {streamInfo.category || "No category"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-2">
        <button
          className="flex-1 rounded-lg bg-amber-400 text-black text-sm font-semibold py-1 hover:bg-amber-300"
          aria-label="Follow the streamer"
        >
          <Heart size={14} className="inline mr-1" aria-hidden="true" /> Follow
        </button>
        <button
          className="flex-1 rounded-lg bg-amber-600 text-white text-sm font-semibold py-1 hover:bg-amber-500"
          aria-label="Send a tip to the streamer"
        >
          <DollarSign size={14} className="inline mr-1" aria-hidden="true" /> Tip
        </button>
      </div>

      {/* Report Button */}
      <button
        className="text-xs text-red-400 mt-auto hover:text-red-300 flex items-center gap-1"
        aria-label="Report this stream"
      >
        <Flag size={12} aria-hidden="true" /> Report Stream
      </button>
    </aside>
  );
}
