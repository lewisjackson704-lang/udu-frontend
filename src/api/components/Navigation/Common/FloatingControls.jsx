import React, { useState, useEffect } from "react";
import {
  Wand2, Scissors, Palette, FilmSlate, Sparkles,
  Mic, Radio, CalendarClock, Users, MessageSquare, DollarSign
} from "lucide-react";

/**
 * FloatingControls
 * - Two mobile FABs: right = Creator (U), left = Live (Mic)
 * - Each opens its own vertical panel; they never open together
 * - Slight pop scale + glass overlay that DOESN'T pause videos underneath
 * - Hidden on desktop and when `hide` prop is true
 */
export default function FloatingControls({ hide = false, onAction }) {
  const [showCreator, setShowCreator] = useState(false);
  const [showLive, setShowLive] = useState(false);

  // Ensure both panels never show at once
  useEffect(() => {
    if (showCreator) setShowLive(false);
  }, [showCreator]);

  useEffect(() => {
    if (showLive) setShowCreator(false);
  }, [showLive]);

  // Auto-hide while scrolling down a bit (mobile polish)
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      try {
        const down = window.scrollY > lastY + 12;
        lastY = window.scrollY;
        if (down) {
          setShowCreator(false);
          setShowLive(false);
        }
      } catch (error) {
        console.error("Error during scroll handling:", error);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (hide) return null;

  const Item = ({ icon: Icon, label, id }) => (
    <button
      onClick={() => onAction?.(id)}
      className="flex items-center gap-2 rounded-xl border border-amber-400/60 bg-black/40 px-3 py-2 text-sm text-amber-300 backdrop-blur-md hover:bg-black/50 active:scale-[0.98]"
      aria-label={label}
    >
      <Icon size={16} className="text-amber-400" aria-hidden="true" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-40 md:hidden">
      {/* Panels */}
      {/* Live (left) */}
      <div
        className={`pointer-events-auto absolute bottom-20 left-3 transition-all ${
          showLive ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
        }`}
      >
        <div className="flex flex-col gap-2 rounded-2xl border border-amber-400/30 bg-black/30 p-3 shadow-xl backdrop-blur-xl">
          <Item id="live:go" icon={Radio} label="Go Live" />
          <Item id="live:schedule" icon={CalendarClock} label="Schedule Live" />
          <Item id="live:audience" icon={Users} label="Audience" />
          <Item id="live:chat" icon={MessageSquare} label="Live Chat" />
        </div>
      </div>

      {/* Creator (right) */}
      <div
        className={`pointer-events-auto absolute bottom-20 right-3 transition-all ${
          showCreator ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
        }`}
      >
        <div className="flex flex-col gap-2 rounded-2xl border border-amber-400/30 bg-black/30 p-3 shadow-xl backdrop-blur-xl">
          <Item id="creator:magic" icon={Wand2} label="Magic" />
          <Item id="creator:cut" icon={Scissors} label="Trim Video" />
          <Item id="creator:style" icon={Palette} label="Style" />
          <Item id="creator:edit" icon={FilmSlate} label="Edit Reel" />
          <Item id="creator:spark" icon={Sparkles} label="Add Spark" />
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="pointer-events-auto fixed bottom-4 left-3 flex items-center">
        <button
          onClick={() => setShowLive((prev) => !prev)}
          className={`flex h-14 w-14 items-center justify-center rounded-full border border-amber-400 bg-black/40 text-amber-400 shadow-xl transition ${
            showLive ? "scale-110" : "hover:scale-[1.1] hover:bg-black/50 active:scale-[0.95]"
          }`}
          aria-label="Live Controls"
        >
          <Mic size={24} />
        </button>
      </div>
      <div className="pointer-events-auto fixed bottom-4 right-3 flex items-center">
        <button
          onClick={() => setShowCreator((prev) => !prev)}
          className={`flex h-14 w-14 items-center justify-center rounded-full border border-amber-400 bg-black/40 text-amber-400 shadow-xl transition ${
            showCreator ? "scale-110" : "hover:scale-[1.1] hover:bg-black/50 active:scale-[0.95]"
          }`}
          aria-label="Creator Controls"
        >
          <DollarSign size={24} />
        </button>
      </div>
    </div>
  );
}
