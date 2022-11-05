"use-strict";

export const authHandler = (socket, next) => {
  let { uid } = socket.handshake.auth;

  if (!uid) {
    return next(new Error("Invalid uid"));
  }

  socket.uid = uid;
  next();
};
