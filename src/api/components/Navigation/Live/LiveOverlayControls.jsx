import React from "react";
import { useStream } from "../../api/context/StreamContext.jsx";
import { MicOff, MessageCircle, Power } from "lucide-react";

export default function LiveOverlayControls() {
  const { stopStream, isLive, connectionStatus } = useStream();

  if (!isLive || connectionStatus !== "live") return null;

  /**
   * Handles stopping the stream safely.
   */
  const handleStopStream = () => {
    try {
      stopStream();
    } catch (error) {
      console.error("Failed to stop the stream:", error);
    }
  };

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4 bg-black/50 backdrop-blur-lg px-5 py-2 rounded-2xl border border-amber-400/30 text-amber-300 shadow-xl z-40"
      aria-label="Live stream controls"
    >
      {/* Mute Button */}
      <button
        className="flex items-center gap-2 hover:text-amber-200"
        aria-label="Mute microphone"
      >
        <MicOff size={16} aria-hidden="true" /> Mute
      </button>

      {/* Hide Chat Button */}
      <button
        className="flex items-center gap-2 hover:text-amber-200"
        aria-label="Hide chat"
      >
        <MessageCircle size={16} aria-hidden="true" /> Hide Chat
      </button>

      {/* End Stream Button */}
      <button
        onClick={handleStopStream}
        className="flex items-center gap-2 text-red-400 hover:text-red-300"
        aria-label="End live stream"
      >
        <Power size={16} aria-hidden="true" /> End Stream
      </button>
    </div>
  );
}
