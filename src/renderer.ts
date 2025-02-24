import { io } from "socket.io-client";

import "./index.css";

const socket = io("http://localhost:3000");

const messages = document.getElementById("messages");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");

// Listen for chat messages
socket.on("chat message", (msg) => {
  const messageElement = document.createElement("div");
  messageElement.textContent = msg;
  messages.appendChild(messageElement);
  messages.scrollTop = messages.scrollHeight; // Auto-scroll to the latest message
});

// Send a message
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  if (message) {
    socket.emit("chat message", message);
    messageInput.value = "";
  }
});
