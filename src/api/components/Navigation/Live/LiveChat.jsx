import React, { useMemo, useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Send, Popcorn } from "lucide-react";

/**
 * Comfortable chat: larger font, uncluttered, subtle rows.
 * - messages: [{ id, user, text, badge? }]
 * - onSend(text): called when sending a message
 * - showHeader: whether to display "Live Chat"
 */
export default function LiveChat({
  messages = [],
  onSend,
  showHeader = true,
  className = "",
}) {
  const [text, setText] = useState("");
  const endRef = useRef(null);

  // Ensure the input text is valid before enabling the send button
  const canSend = useMemo(() => text.trim().length > 0, [text]);

  useEffect(() => {
    try {
      // Auto-scroll to bottom on new messages
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Failed to scroll to the bottom of the chat:", error);
    }
  }, [messages.length]);

  // Sanitize user input to prevent XSS attacks
  const sanitizeText = (input) => {
    try {
      const div = document.createElement("div");
      div.textContent = input;
      return div.innerHTML;
    } catch (error) {
      console.error("Failed to sanitize text:", error);
      return input; // Fallback to the raw input if sanitization fails
    }
  };

  // Submit message handler
  const submit = (e) => {
    e?.preventDefault();
    if (!canSend) return;

    try {
      const sanitizedText = sanitizeText(text.trim());
      onSend?.(sanitizedText);
      setText("");
    } catch (error) {
      console.error("Failed to send the message:", error);
    }
  };

  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md ${className}`}
      role="region"
      aria-label="Live Chat"
    >
      {/* Header */}
      {showHeader && (
        <header className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <Popcorn size={18} className="text-amber-300" aria-hidden="true" />
          <h3 className="text-sm font-semibold text-white">Live Chat</h3>
        </header>
      )}

      {/* Messages */}
      <div
        className="flex-1 space-y-1 overflow-y-auto p-3"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map
