import { io } from "../server.js";

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

  disconnectedUser(socket);

  // Send users connected to the new user
  socket.emit("Users", users);
};

const notifyUsers = (socket) => {
  socket.broadcast.emit("User connected", {
    socketId: socket.id,
    uid: socket.uid,
  });
};

const disconnectedUser = (socket) => {
  socket.on("disconnect", (reason) =>
    socket.broadcast.emit("User disconnected", {
      socketId: socket.id,
      uid: socket.uid,
    })
  );
};
