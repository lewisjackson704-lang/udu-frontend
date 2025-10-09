import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { motion } from "framer-motion";

export default function VideoPlayer({
  src,
  poster,
  autoPlay = false,
  className = "",
  onPlay,
  onPause,
}) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    if (autoPlay) {
      videoRef.current?.play().catch(() => {});
    }
  }, [autoPlay]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      onPlay?.();
    } else {
      video.pause();
      onPause?.();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const wrapper = document.getElementById("player-wrap");
    if (!wrapper) return;

    if (!document.fullscreenElement) {
      wrapper.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const newProgress = Number(e.target.value);
    video.currentTime = (newProgress / 100) * video.duration;
    setProgress(newProgress);
  };

  return (
    <div
      id="player-wrap"
      className={`relative overflow-hidden rounded-2xl bg-black ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="h-full w-full"
        playsInline
        controls={false}
        preload="metadata"
      />

      {/* Controls Overlay */}
      <
