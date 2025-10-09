import React, { useState } from "react";
import PropTypes from "prop-types";
import { Settings, Edit2, UserPlus, Bell, CheckCircle } from "lucide-react";

/**
 * ProfileHeader — hybrid profile header combining creator + social layout.
 * - Dual adaptive (light/dark)
 * - Auto detects if viewer is creator (isOwner)
 * - Displays stats, banner, and action buttons
 */
export default function ProfileHeader({
  user = {
    name: "Ella Creator",
    handle: "@ellavibes",
    bio: "Creating content for dreamers 🌙 | Music, lifestyle, and chill.",
    followers: 12300,
    fans: 480,
    videos: 87,
    views: "1.2M",
    banner: "/banner.jpg",
    avatar: "/logo192.png",
    isOwner: false,
    isVerified: false,
  },
  onSettings,
}) {
  const [following, setFollowing] = useState(false);

  const toggleFollow = () => {
    try {
      setFollowing((prev) => !prev);
    } catch (error) {
      console.error("Error toggling follow status:", error);
    }
  };

  return (
    <div
      className="relative flex w-full flex-col rounded-2xl border border-white/10 bg-white/70 pb-6 text-black shadow-sm dark:bg-black/30 dark:text-white"
      role="region"
      aria-label={`Profile header of ${user.name}`}
    >
      {/* Banner */}
      <div
        className="relative h-40 w-full rounded-t-2xl bg-gradient-to-r from-amber-400/60 to-amber-300/40 dark:from-amber-400/40 dark:to-amber-500/30 overflow-hidden"
        aria-label="Profile banner image"
      >
        {user.banner && (
          <img
            src={user.banner}
            alt={`${user.name}'s banner`}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* Avatar + Info */}
      <div className="relative z-10 -mt-10 flex flex-col items-center sm:flex-row sm:items-end sm:gap-6 px-6">
        <img
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          className="h-24 w-24 rounded-full border-4 border-amber-400 object-cover shadow-[0_0_20px_rgba(255,213,79,0.4)]"
        />

        <div className="mt-4 flex flex-col items-center sm:items-start">
          <div className="flex items-center gap-2 text-xl font-bold">
            {user.name}
            {user.isVerified && (
              <CheckCircle
                size={18}
                className="text-amber-400"
                aria-label="Verified account"
              />
            )}
          </div>
          <p className="text-sm text-black/70 dark:text-white/70">
            {user.handle}
          </p>
          <p className="mt-2 max-w-md text-center text-sm text-black/80 dark:text-white/70 sm:text-left">
            {user.bio}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex w-full justify-center gap-2 sm:ml-auto sm:w-auto">
          {user.isOwner ? (
            <>
              <button
                onClick={onSettings}
                className="flex items-center gap-2 rounded-xl border border-amber-400 bg-amber-400/10 px-3 py-1.5 text-sm font-semibold text-amber-600 hover:bg-amber-400/20 dark:text-amber-300"
                aria-label="Open settings"
              >
                <Settings size={16} /> Settings
              </button>
              <button
                className="flex items-center gap-2 rounded-xl border border-amber-400 bg-amber-400/10 px-3 py-1.5 text-sm font-semibold text-amber-600 hover:bg-amber-400/20 dark:text-amber-300"
                aria-label="Edit profile"
              >
                <Edit2 size={16} /> Edit Profile
              </button>
            </>
          ) : (
            <>
              <button
                onClick={toggleFollow}
                className={`flex items-center gap-2 rounded-xl border ${
                  following
                    ? "border-amber-400 bg-amber-400 text-black"
                    : "border-amber-400 bg-amber-400/10 text-amber-600 dark:text-amber-300"
                } px-3 py-1.5 text-sm font-semibold hover:bg-amber-400/20 dark:hover:bg-amber-400/20`}
                aria-label={following ? "Unfollow" : "Follow"}
              >
                {following ? <CheckCircle size={16} /> : <UserPlus size={16} />}
                {following ? "Following" : "Follow"}
              </button>
              <button
                className="flex items-center gap-2 rounded-xl border border-amber-400 bg-amber-400/10 px-3 py-1.5 text-sm font-semibold text-amber-600 hover:bg-amber-400/20 dark:text-amber-300"
                aria-label="Turn on notifications"
              >
                <Bell size={16} /> Notify
              </button>
            </>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="mt-6 flex justify-center gap-6 text-center sm:justify-start sm:pl-6">
        <div>
          <div className="text-lg font-semibold text-amber-500 dark:text-amber-400">
            {user.followers.toLocaleString()}
          </div>
          <p className="text-xs text-black/70 dark:text-white/70">Followers</p>
        </div>
        <div>
          <div className="text-lg font-semibold text-amber-500 dark:text-amber-400">
            {user.fans.toLocaleString()}
          </div>
          <p className="text-xs text-black/70 dark:text-white/70">Fans</p>
        </div>
        <div>
          <div className="text-lg font-semibold text-amber-500 dark:text-amber-400">
            {user.videos.toLocaleString()}
          </div>
          <p className="text-xs text-black/70 dark:text-white/70">Videos</p>
        </div>
        <div>
          <div className="text-lg font-semibold text-amber-500 dark:text-amber-400">
            {user.views}
          </div>
          <p className="text-xs text-black/70 dark:text-white/70">Views</p>
        </div>
      </div>
    </div>
  );
}

ProfileHeader.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    fans: PropTypes.number.isRequired,
    videos: PropTypes.number.isRequired,
    views: PropTypes.string.isRequired,
    banner: PropTypes.string,
    avatar: PropTypes.string,
    isOwner: PropTypes.bool,
    isVerified: PropTypes.bool,
  }).isRequired,
  onSettings: PropTypes.func.isRequired,
};
