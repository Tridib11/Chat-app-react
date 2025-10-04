import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("chat_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat_message");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      socket.emit("chat_message", message);
      setMessage("");
    }
  };
  return (
    <div>
      <h2>Basic Chat App</h2>

      {/* Show all messages */}
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>

      {/* Input + Send button */}
      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
