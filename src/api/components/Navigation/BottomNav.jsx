import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Compass, Radio, User } from "lucide-react";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/live", label: "Live", icon: Radio },
  { to: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  return (
    <div
      className="fixed md:hidden left-0 right-0 bottom-0 z-40 border-t bg-[var(--header-bg)]"
      style={{
        borderColor: "var(--border)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="grid grid-cols-4 h-14">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center text-xs ${
                isActive ? "font-semibold text-amber-400" : "hover:text-amber-300"
              }`
            }
            style={{ color: "var(--text)" }}
            title={label}
            aria-current={({ isActive }) => (isActive ? "page" : undefined)}
          >
            <Icon size={20} className="mb-1 opacity-85" />
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
