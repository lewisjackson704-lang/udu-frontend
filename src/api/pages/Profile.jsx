import React, { useState } from "react";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileVideos from "../components/Profile/ProfileVideos";
import ProfileSettings from "../components/Profile/ProfileSettings";

/**
 * Full Profile Page (Hybrid for Creators + Viewers)
 * - Shows ProfileHeader, ProfileVideos, and optional ProfileSettings
 * - Adaptive (light/dark)
 * - Consistent amber styling with the rest of U·DU
 */

export default function Profile() {
  const [isOwner, setIsOwner] = useState(true); // toggle true for creator view
  const [showSettings, setShowSettings] = useState(false);

  const handleSettings = () => {
    try {
      setShowSettings((prev) => !prev);
    } catch (error) {
      console.error("Error toggling settings visibility:", error);
    }
  };

  const userData = {
    name: "Ella Creator",
    handle: "@ellavibes",
    bio: "Creating content for dreamers 🌙 | Music, lifestyle, and chill.",
    followers: 12300,
    fans: 480,
    videos: 87,
    views: "1.2M",
    banner: "/banner.jpg",
    avatar: "/logo192.png",
    isOwner,
    isVerified: true,
  };

  const videoData = [
    {
      id: 1,
      title: "Studio Session Vibes",
      views: 4200,
      likes: 650,
      thumbnail: "/logo192.png",
    },
    {
      id: 2,
      title: "New Single Teaser",
      views: 3100,
      likes: 480,
      thumbnail: "/logo192.png",
    },
    {
      id: 3,
      title: "Behind The Scenes",
      views: 5000,
      likes: 780,
      thumbnail: "/logo192.png",
    },
    {
      id: 4,
      title: "Late Night Freestyle",
      views: 6100,
      likes: 920,
      thumbnail: "/logo192.png",
    },
  ];

  return (
    <div
      className="flex h-full w-full flex-col bg-white text-black transition-colors duration-300 dark:bg-black dark:text-white"
      role="region"
      aria-label="User profile page"
    >
      {/* Profile Header */}
      <ProfileHeader user={userData} onSettings={handleSettings} />

      {/* Settings Panel (Creators Only) */}
      {isOwner && showSettings && (
        <div
          className="mx-auto mt-6 w-[95%] max-w-3xl"
          role="region"
          aria-label="Profile settings panel"
        >
          <ProfileSettings />
        </div>
      )}

      {/* Video Grid */}
      <main
        className="mx-auto w-[95%] max-w-6xl flex-1 p-6"
        role="region"
        aria-label="User video uploads"
      >
        <h3
          className="mb-3 text-lg font-semibold text-amber-500 dark:text-amber-400"
          id="video-section-title"
        >
          {isOwner ? "Your Videos" : "Recent Uploads"}
        </h3>
        <ProfileVideos videos={videoData} />
      </main>
    </div>
  );
}
