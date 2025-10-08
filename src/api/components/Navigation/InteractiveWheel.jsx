import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Camera, Users, Play, Upload, Sparkles, Brush, Settings, Radio } from "lucide-react";

export default function InteractiveWheel({ hidden = false, isPlaying = false }) {
  const [open, setOpen] = useState(null); // "live" | "creator" | null
  const [visible, setVisible] = useState(true);
  const [idle, setIdle] = useState(false);
  const lastY = useRef(0);
  const idleTimer = useRef(null);
  const navigate = useNavigate();

  const vibrate = () => "vibrate" in navigator && navigator.vibrate(15);

  const baseFab = useMemo(() => ({
    height: 56,
    width: 56,
    display: "grid",
    placeItems: "center",
    borderRadius: "9999px",
    background: "rgba(0,0,0,0.35)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
    marginBottom: "env(safe-area-inset-bottom)",
    fontWeight: 800,
  }), []);

  const amber = useMemo(() => ({
    border: "2px solid #FFD54F",
    color: "#FFD54F",
    boxShadow: "0 0 10px #FFD54F, 0 6px 18px rgba(0,0,0,.4)",
  }), []);

  const rose = useMemo(() => ({
    border: "2px solid #FF6B81",
    color: "#FF6B81",
    boxShadow: "0 0 10px #FF6B81, 0 6px 18px rgba(0,0,0,.4)",
  }), []);

  const go = (to) => {
    vibrate();
    setOpen(null);
    navigate(to);
  };

  const creator = [
    { icon: Upload, label: "Upload", to: "/upload" },
    { icon: Sparkles, label: "FX", to: "/fx" },
    { icon: Brush, label: "Animator", to: "/animator" },
    { icon: Settings, label: "Settings", to: "/settings" },
    { icon: Radio, label: "Monetize", to: "/monetization" },
  ];

  const live = [
    { icon: Mic, label: "Audio Room", to: "/live?mode=audio" },
    { icon: Camera, label: "Camera", to: "/live?mode=video" },
    { icon: Users, label: "Invite", to: "/live/invite" },
    { icon: Play, label: "Go Live", to: "/live" },
  ];

  return (
    <>
      {/* LEFT - LIVE */}
      <motion.div
        className="md:hidden fixed left-5 z-50"
        style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
        animate={{ y: hidden || !visible ? 70 : 0, opacity: hidden || !visible ? 0 : 1 }}
        transition={{ duration: 0.22 }}
      >
        {/* Panel */}
        <AnimatePresence>
          {open === "live" && (
            <ToolPanel tools={live} onClose={go} style={rose} />
          )}
        </AnimatePresence>

        {/* Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(open === "live" ? null : "live")}
          aria-label="Live tools"
          style={{ ...baseFab, ...rose }}
        >
          <Mic size={22} />
        </motion.button>
      </motion.div>

      {/* RIGHT - CREATOR */}
      <motion.div
        className="md:hidden fixed right-5 z-50"
        style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
        animate={{ y: hidden || !visible ? 70 : 0, opacity: hidden || !visible ? 0 : 1 }}
        transition={{ duration: 0.22 }}
      >
        <AnimatePresence>
          {open === "creator" && (
            <ToolPanel tools={creator} onClose={go} style={amber} />
          )}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(open === "creator" ? null : "creator")}
          aria-label="Creator tools"
          style={{ ...baseFab, ...amber }}
        >
          U
        </motion.button>
      </motion.div>
    </>
  );
}

function ToolPanel({ tools, onClose, style }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      style={{
        marginBottom: 12,
        borderRadius: 20,
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        backdropFilter: "blur(16px)",
        background: "rgba(0,0,0,0.6)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {tools.map(({ icon: Icon, label, to }) => (
        <button
          key={label}
          onClick={() => onClose(to)}
          style={{ display: "flex", alignItems: "center", gap: 8, color: style.color }}
          className="hover:scale-105 active:scale-95"
        >
          <Icon size={18} />
          <span>{label}</span>
        </button>
      ))}
    </motion.div>
  );
}
