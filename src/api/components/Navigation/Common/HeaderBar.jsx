import React from "react";
import { Bell, Upload } from "lucide-react";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

/**
 * HeaderBar — top navigation bar for desktop/tablet
 * - Logo, Search, actions, avatar
 * - Uses your existing SearchBar + ThemeToggle
 */
export default function HeaderBar({ onSearch, user }) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-black/5 bg-white/80 px-4 py-3 backdrop-blur-md dark:border-white/10 dark:bg-black/40">
      {/* Logo */}
      <div className="mr-1 select-none text-2xl font-extrabold text-amber-500 dark:text-amber-400">
        YuDux
      </div>

      {/* Search */}
      <div className="mx-2 flex-1 max-w-[920px]">
        <SearchBar onSearch={onSearch} placeholder="Search videos, creators, tags..." />
      </div>

      {/* Actions */}
      <div className="hidden items-center gap-2 sm:flex">
        <button className="rounded-xl border border-amber-400/70 bg-amber-400/10 px-3 py-1.5 text-sm font-semibold text-amber-600 hover:bg-amber-400/20 dark:text-amber-300">
          <div className="flex items-center gap-2">
            <Upload size={16} /> Upload
          </div>
        </button>
        <button className="rounded-xl border border-white/15 bg-black/30 p-2 text-amber-300 hover:bg-black/40">
          <Bell size={18} />
        </button>
        <ThemeToggle />
        <img
          src={user?.avatar || "/logo192.png"}
          alt="profile"
          className="ml-1 h-8 w-8 rounded-full object-cover ring-2 ring-amber-400/60"
        />
      </div>
    </header>
  );
}
