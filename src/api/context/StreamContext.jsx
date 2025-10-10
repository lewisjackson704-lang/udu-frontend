import React, { createContext, useContext, useState, useEffect, useRef } from "react";

/**
 * StreamContext
 * Manages global live streaming state —
 * whether the user is live, stream metadata, viewer count,
 * and event handlers for chat, errors, and disconnects.
 */

export const StreamContext = createContext();

export const StreamProvider = ({ children }) => {
  const [isLive, setIsLive] = useState(false);
  const [streamKey, setStreamKey] = useState(null);
  const [viewerCount, setViewerCount] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [streamInfo, setStreamInfo] = useState({
    title: "",
    category: "",
    thumbnail: "",
  });
  const [connectionStatus, setConnectionStatus] = useState("idle"); // idle | connecting | live | error | disconnected

  const ws = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:3000";

  /**
   * Starts a stream with the given title, category, and thumbnail.
   */
  const startStream = async (title, category, thumbnail) => {
    try {
      setConnectionStatus("connecting");
      const res = await fetch(`${API_URL}/api/streams/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, thumbnail }),
      });

      if (!res.ok) throw new Error(`Failed to start stream: ${res.statusText}`);
      const data = await res.json();

      if (data?.key) {
        setStreamKey(data.key);
        setStreamInfo({ title, category, thumbnail });
        setIsLive(true);
        setConnectionStatus("live");
      } else {
        throw new Error("No stream key returned");
      }
    } catch (err) {
      console.error("Start stream failed:", err);
      setConnectionStatus("error");
    }
  };

  /**
   * Stops the live stream.
   */
  const stopStream = async () => {
    try {
      await fetch(`${API_URL}/api/streams/stop`, { method: "POST" });
    } catch (err) {
      console.error("Stop stream failed:", err);
    } finally {
      setIsLive(false);
      setStreamKey(null);
      setConnectionStatus("idle");
    }
  };

  /**
   * Connects to a WebSocket for live updates.
   */
  useEffect(() => {
    if (!isLive) return;

    ws.current = new WebSocket(`${WS_URL}/live`);

    ws.current.onopen = () => {
      console.log("Connected to live socket");
      setConnectionStatus("live");
    };

    ws.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === "VIEWERS") setViewerCount(msg.count);
        if (msg.type === "CHAT") setChatMessages((prev) => [...prev, msg]);
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    ws.current.onerror = (e) => {
      console.error("Stream WebSocket error:", e);
      setConnectionStatus("error");
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
      setConnectionStatus("disconnected");
    };

    // Cleanup WebSocket on unmount
    return () => {
      if (ws.current) {
        ws.current.onclose = null;
        ws.current.close();
      }
    };
  }, [isLive, WS_URL]);

  /**
   * Sends a chat message through the WebSocket.
   */
  const sendChat = (text, user) => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      console.warn("WebSocket is not open. Unable to send message.");
      return;
    }

    const message = { type: "CHAT", text: text.trim(), user, timestamp: Date.now() };
    if (!text.trim() || text.length > 500) {
      console.warn("Invalid chat message: must be non-empty and <= 500 characters.");
      return;
    }

    ws.current.send(JSON.stringify(message));
    setChatMessages((prev) => [...prev, message]);
  };

  return (
    <StreamContext.Provider
      value={{
        isLive,
        streamKey,
        viewerCount,
        chatMessages,
        streamInfo,
        connectionStatus,
        startStream,
        stopStream,
        sendChat,
      }}
    >
      {children}
    </StreamContext.Provider>
  );
};

/**
 * Custom hook for accessing the StreamContext.
 */
export const useStream = () => {
  const context = useContext(StreamContext);
  if (!context) {
    throw new Error("useStream must be used within a StreamProvider");
  }
  return context;
};
