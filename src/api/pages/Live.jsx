import React, { useState } from "react";
import LivePlayer from "../components/Live/LivePlayer";
import LiveChat from "../components/Live/LiveChat";
import LiveSchedule from "../components/Live/LiveSchedule";

/**
 * Full Live page layout — comfortable, responsive, and clear.
 * - On desktop: video left (70%), chat right (30%).
 * - On mobile: video top, chat collapses into a slide-up panel.
 */
export default function Live() {
  const [messages, setMessages] = useState([
    { id: 1, user: "Ella", text: "Let’s gooo 🔥" },
    { id: 2, user: "Jay", text: "Sound quality is great!", badge: "Fan+" },
    { id: 3, user: "Kris", text: "Love the vibe!" },
  ]);

  const [schedule] = useState(() => [
    {
      id: 1,
      title: "Late Night Studio Session",
      when: new Date(Date.now() + 3600 * 1000 * 2),
      host: "Ella",
      thumbnail: "/logo192.png",
    },
    {
      id: 2,
      title: "Behind The Beat",
      when: new Date(Date.now() + 3600 * 1000 * 6),
      host: "Kris",
      thumbnail: "/logo192.png",
    },
  ]);

  const sendMessage = (text) => {
    try {
      const id = messages.length + 1;
      setMessages([...messages, { id, user: "You", text }]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div
      className="flex h-full w-full flex-col bg-black/95 text-white"
      role="main"
      aria-label="Live Streaming Page"
    >
      {/* Top header */}
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-3">
        <h2 className="text-lg font-semibold text-amber-300">U·DU Live</h2>
        <div className="flex items-center gap-3">
          <button
            className="rounded-xl border border-amber-300/40 bg-black/40 px-3 py-1.5 text-sm font-semibold text-amber-300 hover:border-amber-300"
            onClick={() => console.log("Go Live button clicked.")}
            aria-label="Go Live"
          >
            Go Live
          </button>
        </div>
      </header>

      {/* Main layout */}
      <main className="flex flex-1 flex-col lg:flex-row">
        {/* Left: Player + Schedule */}
        <div className="flex flex-1 flex-col gap-4 p-4 lg:w-[70%]">
          <LivePlayer
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            title="Studio Live with Ella"
            viewers={324}
            poster="/logo192.png"
          />
          <LiveSchedule
            items={schedule}
            onRemind={(id) => {
              try {
                console.log(`Reminder set for stream ID: ${id}`);
              } catch (error) {
                console.error(`Failed to set reminder for stream ID ${id}:`, error);
              }
            }}
          />
        </div>

        {/* Right: Chat */}
        <aside
          className="border-t border-white/10 lg:w-[30%] lg:border-l lg:border-t-0"
          role="complementary"
          aria-label="Live Chat Section"
        >
          <LiveChat
            messages={messages}
            onSend={(text) => {
              try {
                sendMessage(text);
              } catch (error) {
                console.error("Error in chat message submission:", error);
              }
            }}
          />
        </aside>
      </main>
    </div>
  );
}
