import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { motion } from "framer-motion";
import LiveOverlay from "./LiveOverlay";

/**
 * Clean, high-priority player with subtle controls.
 * Props:
 *  - src: video/stream URL
 *  - poster: preview image (optional)
 *  - live: boolean (LIVE badge)
 *  - viewers: number
 *  - title: string
 *  - autoPlay: boolean
 *  - locale: string (for internationalization)
 */
export default function LivePlayer({
  src,
  poster,
  live = true,
  viewers = 0,
  title = "",
  autoPlay = true,
  className = "",
  locale = "en-US",
}) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sanitize the source and poster URLs to prevent XSS
  const sanitizeUrl = (url) => {
    try {
      const sanitizedUrl = new URL(url);
      return sanitizedUrl.href;
    } catch {
      console.error("Invalid URL provided:", url);
      return "";
    }
  };

  const sanitizedSrc = sanitizeUrl(src);
  const sanitizedPoster = sanitizeUrl(poster);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100 || 0);
    };

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    if (autoPlay && sanitizedSrc) {
      video.play().catch((err) => {
        console.error("AutoPlay failed:", err);
      });
    }

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [autoPlay, sanitizedSrc]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.paused ? video.play() : video.pause();
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const newProgress = Number(e.target.value);
    video.currentTime = (newProgress / 100) * video.duration;
    setProgress(newProgress);
  };

  const toggleFullscreen = () => {
    const playerWrapper = document.getElementById("live-player-wrap");
    if (!playerWrapper) return;

    if (!document.fullscreenElement) {
      playerWrapper.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      id="live-player-wrap"
      className={`relative overflow-hidden rounded-2xl bg-black ${className}`}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={sanitizedSrc}
        poster={sanitizedPoster}
        className="h-full w-full"
        playsInline
        controls={false}
        preload="metadata"
      />

      {/* Amber edge glow ring (subtle) */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-amber-300/25" />

      {/* Overlay with LIVE + viewers */}
      <LiveOverlay
        title={title}
        live={live}
        viewers={new Intl.NumberFormat(locale).format(viewers)}
      />

      {/* Bottom gradient for control readability */}
      <motion.div
        initial={{ opacity: 0.95 }}
        animate={{ opacity: 1 }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
      />

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 p-3">
        {/* Progress Bar */}
        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={Number.isFinite(progress) ? progress : 0}
          onChange={handleSeek}
          aria-label="Seek video progress"
          className="w-full"
          style={{
            appearance: "none",
            background: `linear-gradient(to right, #FFD54F 0%, #FFD54F ${progress}%, rgba(255,255,255,0.25) ${progress}%, rgba(255,255,255,0.25) 100%)`,
            height: "4px",
            borderRadius: "9999px",
          }}
        />

        {/* Control Buttons */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label={playing ? "Pause video" : "Play video"}
            >
              {playing ? <Pause size={18} /> : <Play size={18} />}
            </button>

            {/* Mute/Unmute Button */}
            <button
              onClick={toggleMute}
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label={muted ? "Unmute video" : "Mute video"}
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </
