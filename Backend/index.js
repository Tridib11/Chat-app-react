const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ A user connected: " + socket.id);

  socket.on("chat_message", (msg) => {
    console.log("💬 Message from " + socket.id + ": " + msg);
    io.emit("chat_message", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected: " + socket.id);
  });
});

server.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
