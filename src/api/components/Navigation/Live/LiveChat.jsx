import React, { useState } from "react";
import { useStream } from "../../api/context/StreamContext.jsx";
import { Send } from "lucide-react";

export default function LiveChat({ user }) {
  const { chatMessages, sendChat, isLive } = useStream();
  const [message, setMessage] = useState("");

  /**
   * Handles sending a chat message.
   * Clears the input after sending.
   */
  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      sendChat(message, user?.name || "Guest");
      setMessage("");
    } catch (error) {
      console.error("Failed to send chat message:", error);
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-black/50 text-white rounded-xl border border-amber-400/30 backdrop-blur-lg">
      {/* Chat Messages */}
      <div
        className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-amber-400/60"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {!isLive && (
          <p className="text-center text-sm text-amber-400/70" role="status">
            Chat is unavailable until the stream is live.
          </p>
        )}
        {chatMessages.map((msg, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-xs font-semibold text-amber-400">{msg.user}</span>
            <span className="text-sm text-white/90">{msg.text}</span>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form
        onSubmit={handleSend}
        className="flex items-center border-t border-white/10 p-2"
        aria-label="Chat input form"
      >
        <input
          type="text"
          value={message}
          disabled={!isLive}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isLive ? "Say something..." : "Waiting for stream..."}
          className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/40"
          aria-label="Chat message input"
        />
        <button
          type="submit"
          disabled={!isLive}
          className="ml-2 rounded-lg bg-amber-500 px-3 py-1 text-sm font-semibold text-black hover:bg-amber-400 disabled:opacity-50"
          aria-label="Send message"
        >
          <Send size={16} aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
