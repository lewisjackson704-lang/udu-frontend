import React, { useState } from "react";
import useSocket from "../hooks/useSocket";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);

  const socketHandlers = {
    message: (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    },
    disconnect: () => {
      console.warn("Disconnected from the server.");
    },
  };

  const socket = useSocket(socketHandlers);

  const sendMessage = () => {
    socket.emit("message", "Hello, world!");
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}
