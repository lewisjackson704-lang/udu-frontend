import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Compass, PlaySquare, Radio, BarChart3 } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/studio", label: "Creator Studio", icon: PlaySquare },
  { to: "/live", label: "Live Dashboard", icon: Radio },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-amber-400 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 bg-[var(--page-bg)] border-r transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative`}
        style={{ borderColor: "var(--border)" }}
      >
        <div className="px-4 py-4 text-2xl font-extrabold text-amber-400">
          U·DU
        </div>
        <nav className="px-2 pb-4 space-y-1">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                  isActive ? "bg-black/10 font-semibold" : "hover:bg-black/5"
                }`
              }
              style={{ color: "var(--text)" }}
              title={label}
              aria-current={({ isActive }) => (isActive ? "page" : undefined)}
            >
              <Icon size={18} className="opacity-80" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <footer className="mt-auto p-4 text-sm text-gray-500">
          © 2025 U·DU. All rights reserved.
        </footer>
      </aside>
    </>
  );
}
