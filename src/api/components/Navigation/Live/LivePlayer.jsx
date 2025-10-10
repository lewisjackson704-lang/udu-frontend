import React, { useEffect, useRef } from "react";
import { useStream } from "../../api/context/StreamContext.jsx";
import { Eye, WifiOff } from "lucide-react";

export default function LivePlayer() {
  const { isLive, viewerCount, streamInfo, connectionStatus } = useStream();
  const videoRef = useRef(null);

  useEffect(() => {
    if (isLive && videoRef.current) {
      import("hls.js")
        .then((Hls) => {
          if (Hls.isSupported() && videoRef.current) {
            const hls = new Hls.default();
            hls.loadSource(
              `${import.meta.env.VITE_STREAM_URL}/${streamInfo.title || "udu-live"}.m3u8`
            );
            hls.attachMedia(videoRef.current);

            // Cleanup HLS instance on unmount or when stream stops
            return () => {
              hls.destroy();
            };
          }
        })
        .catch((err) => {
          console.error("Failed to load HLS.js or attach the stream:", err);
        });
    }
  }, [isLive, streamInfo]);

  return (
    <div className="relative w-full bg-black aspect-video rounded-xl overflow-hidden shadow-lg">
      {!isLive ? (
        <div
          className="flex flex-col items-center justify-center h-full text-amber-400"
          role="status"
          aria-label="Stream is offline"
        >
          <WifiOff size={32} className="mb-2" />
          <p className="text-sm">Stream is currently offline</p>
        </div>
      ) : (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          aria-label="Live stream player"
        />
      )}

      {isLive && (
        <div
          className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md"
          aria-live="polite"
        >
          LIVE
        </div>
      )}

      {isLive && (
        <div
          className="absolute top-2 right-2 flex items-center gap-1 bg-black/40 text-white text-xs px-2 py-1 rounded-md"
          aria-label={`Viewer count: ${viewerCount}`}
        >
          <Eye size={12} /> {viewerCount}
        </div>
      )}
    </div>
  );
}
