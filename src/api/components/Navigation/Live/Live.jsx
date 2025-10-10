import React, { useEffect } from "react";
import { useAuth } from "../api/context/AuthContext.jsx";
import { useStream } from "../api/context/StreamContext.jsx";
import LivePlayer from "../components/Live/LivePlayer.jsx";
import LiveChat from "../components/Live/LiveChat.jsx";
import LiveSidebar from "../components/Live/LiveSidebar.jsx";
import LiveOverlayControls from "../components/Live/LiveOverlayControls.jsx";
import LoadingSpinner from "../components/Common/LoadingSpinner.jsx";

/**
 * Live Page
 * - Displays LivePlayer, Chat, and Sidebar
 * - Handles streamer + viewer layouts automatically
 * - Fully adaptive (mobile/tablet/desktop)
 */
export default function Live() {
  const { user, loading } = useAuth();
  const { isLive, connectionStatus, startStream, stopStream } = useStream();

  // Automatically handle live mode when user logs in
  useEffect(() => {
    try {
      if (user && !isLive && connectionStatus === "idle") {
        console.log("User ready for live mode:", user.name);
        // Replace with actual stream start logic if required
      }
    } catch (error) {
      console.error("Error initializing live mode:", error);
    }
  }, [user, isLive, connectionStatus]);

  if (loading) {
    return (
      <div
        className="flex h-screen w-full items-center justify-center bg-black text-white"
        role="alert"
        aria-live="assertive"
      >
        <LoadingSpinner size={48} />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col md:flex-row gap-4 p-4 min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white"
      aria-label="Live stream page"
    >
      {/* Left Section: Video + Overlay Controls */}
      <div className="flex-1 flex flex-col gap-4">
        <LivePlayer />
        <LiveOverlayControls />
      </div>

      {/* Right Section: Chat + Sidebar */}
      <div className="w-full md:w-80 flex flex-col gap-4">
        <LiveChat user={user} />
        <LiveSidebar user={user} />
      </div>

      {/* Stream Status Footer */}
      <div
        className="fixed bottom-2 left-1/2 -translate-x-1/2 text-center text-xs text-white/70"
        aria-live="polite"
        aria-atomic="true"
      >
        {connectionStatus === "live" && (
          <span className="text-green-400 font-semibold" aria-label="Stream is live">
            🔴 Stream Live
          </span>
        )}
        {connectionStatus === "connecting" && (
          <span aria-label="Connecting to the stream">Connecting to stream...</span>
        )}
        {connectionStatus === "error" && (
          <span className="text-red-400" aria-label="Stream connection error">
            Connection error — retrying...
          </span>
        )}
      </div>
    </div>
  );
}
