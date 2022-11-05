import { io } from "../server.js";
import { authHandler } from "./authHandler.js";

export const onConnection = (socket) => {
  const users = [];

  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      socketId: id,
      uid: socket.uid,
    });
  }

  // Notify users already connected
  notifyUsers(socket);

  // Send users connected to the new user
  socket.emit("users", users);
};

const notifyUsers = (socket) => {
  socket.broadcast.emit("User connected", {
    userId: socket.id,
    uid: socket.uid,
  });
};
