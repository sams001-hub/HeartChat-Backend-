import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: [
      "https://heart-chat-frontend-p6gu.vercel.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("HeartChat Backend is Running ❤️");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is healthy 💪" });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://heart-chat-frontend-p6gu.vercel.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("⚡ New user connected:", socket.id);

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
