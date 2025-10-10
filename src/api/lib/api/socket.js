// src/lib/socket.js
// Single socket.io client for the whole app

import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL || window.location.origin;

if (!SOCKET_URL) {
  throw new Error("SOCKET_URL is undefined. Please set VITE_SOCKET_URL or VITE_API_URL.");
}

// Lazy singleton
let socket;

export function getSocket() {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 10000,
    });

    // Handle connection errors
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    // Handle disconnections
    socket.on("disconnect", (reason) => {
      console.warn("Socket disconnected:", reason);
      if (reason === "io server disconnect") {
        socket.connect(); // Reconnect manually
      }
    });

    // Debugging in development mode
    if (import.meta.env.MODE === "development") {
      socket.onAny((event, ...args) => {
        console.debug(`Socket event: ${event}`, args);
      });
    }
  }
  return socket;
}

// Utility to attach socket event listeners
export function onSocketEvent(event, callback) {
  const socket = getSocket();
  socket.on(event, callback);
}

export function offSocketEvent(event, callback) {
  const socket = getSocket();
  socket.off(event, callback);
}
