import React, { useEffect } from "react";
import AppRouter from "./router.jsx";
import { useTheme } from "./context/ThemeContext.jsx";
import { useUI } from "./context/UIContext.jsx";
import { io } from "socket.io-client";
import InteractiveWheel from "./components/Navigation/InteractiveWheel.jsx";

export default function App() {
  const { theme } = useTheme();
  const { wheelOpen, livePanelOpen, closeAll } = useUI();

  // Initialize Socket.IO connection
  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL || "https://yudux-backend.onrender.com", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
    });

    socket.on("connect", () => console.log("🟢 Socket connected:", socket.id));
    socket.on("disconnect", () => console.warn("🔴 Socket disconnected"));

    // Example event handler for global comment updates
    socket.on("comment:new", (data) => {
      console.log("💬 New comment event:", data);
    });

    // Cleanup socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Apply theme to the document's root element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Close floating UIs when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (wheelOpen || livePanelOpen) {
        if (!e.target.closest(".floating-wheel") && !e.target.closest(".live-panel")) {
          closeAll();
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [wheelOpen, livePanelOpen, closeAll]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white transition-colors duration-300">
      {/* Main Router */}
      <AppRouter />

      {/* Floating Creator Wheel */}
      {wheelOpen && (
        <div className="fixed bottom-16 right-6 z-50 floating-wheel">
          <InteractiveWheel />
        </div>
      )}
    </div>
  );
}
