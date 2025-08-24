import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// export function getReceiverSocketId(userId) {
//   return userSocketMap[userId];
// }

// used to store online users
const userSocketMap = {}; // {userId: socketId}

// lets listen any incoming connection
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  // if have userId then update onlineUsers map
  if (userId) userSocketMap[userId] = socket.id;


//   io.emit() is used to send events to all the connected clients or broadcast to all the users who are connected 
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    // when user disconnected then remove from online users map
    delete userSocketMap[userId];
    // let them everyone know 
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };