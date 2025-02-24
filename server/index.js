const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for chat messages
  socket.on("chat message", (msg) => {
    console.log("Message:", msg);
    io.emit("chat message", msg); // Broadcast the message to all clients
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
