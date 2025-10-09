import React, { useState } from "react";
import PropTypes from "prop-types";
import { Moon, Sun, Shield, Bell, Save } from "lucide-react";

/**
 * ProfileSettings — user preferences panel
 * Adaptive layout for account, privacy, and theme.
 */
export default function ProfileSettings() {
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState("public");

  const toggleTheme = () => {
    try {
      setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    } catch (error) {
      console.error("Failed to toggle theme:", error);
    }
  };

  const toggleNotifications = () => {
    try {
      setNotifications((prevState) => !prevState);
    } catch (error) {
      console.error("Failed to toggle notifications:", error);
    }
  };

  const handleSave = () => {
    try {
      console.info("Settings saved:", { theme, notifications, privacy });
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  return (
    <div
      className="rounded-2xl border border-black/10 bg-white/70 p-6 text-black shadow-md transition-colors duration-300 dark:border-white/10 dark:bg-black/30 dark:text-white"
      role="region"
      aria-label="Profile settings panel"
    >
      <h3
        className="mb-4 text-lg font-semibold text-amber-500 dark:text-amber-400"
        id="settings-title"
      >
        Account Settings
      </h3>

      <div className="space-y-4">
        {/* Theme */}
        <div className="flex items-center justify-between" role="group" aria-labelledby="theme-mode">
          <span className="flex items-center gap-2 text-sm font-medium" id="theme-mode">
            <Moon size={16} aria-hidden="true" /> Theme Mode
          </span>
          <button
            onClick={toggleTheme}
            className="rounded-xl border border-amber-400 bg-amber-400/10 px-3 py-1.5 text-sm font-semibold text-amber-600 hover:bg-amber-400/20 dark:text-amber-300"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
            {theme === "dark" ? " Light" : " Dark"}
          </button>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between" role="group" aria-labelledby="notifications-toggle">
          <span className="flex items-center gap-2 text-sm font-medium" id="notifications-toggle">
            <Bell size={16} aria-hidden="true" /> Notifications
          </span>
          <button
            onClick={toggleNotifications}
            className={`rounded-xl border px-3 py-1.5 text-sm font-semibold ${
              notifications
                ? "border-amber-400 bg-amber-400 text-black"
                : "border-amber-400 bg-amber-400/10 text-amber-600 dark:text-amber-300"
            }`}
            aria-label={`Turn notifications ${notifications ? "off" : "on"}`}
          >
            {notifications ? "On" : "Off"}
          </button>
        </div>

        {/* Privacy */}
        <div className="flex items-center justify-between" role="group" aria-labelledby="privacy-settings">
          <span className="flex items-center gap-2 text-sm font-medium" id="privacy-settings">
            <Shield size={16} aria-hidden="true" /> Profile Privacy
          </span>
          <select
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            className="rounded-lg border border-amber-400 bg-transparent px-2 py-1 text-sm text-black dark:text-white"
            aria-label="Select profile privacy settings"
          >
            <option value="public">Public</option>
            <option value="fans">Fans Only</option>
            <option value="private">Private</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          className="mt-4 flex items-center gap-2 rounded-xl border border-amber-400 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-600 hover:bg-amber-400/20 dark:text-amber-300"
          aria-label="Save profile settings"
        >
          <Save size={16} aria-hidden="true" /> Save Changes
        </button>
      </div>
    </div>
  );
}

ProfileSettings.propTypes = {
  theme: PropTypes.oneOf(["dark", "light"]),
  notifications: PropTypes.bool,
  privacy: PropTypes.oneOf(["public", "fans", "private"]),
};
