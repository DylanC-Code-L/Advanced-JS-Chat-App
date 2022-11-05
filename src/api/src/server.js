import Express from "express";
import dotenv from "dotenv";
import { UsersRoutes } from "./Routes/users.routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import { ConversationsRoutes } from "./Routes/conversations.routes.js";

dotenv.config({ path: "./Configs/.env" });

const app = new Express(cors());

// All environnements
app.use(cors());
app.use(bodyParser.json());

// Roads
app.use("/api/users", UsersRoutes);
app.use("/api/messages", ConversationsRoutes);

// Server listen

// app.listen(process.env.PORT, () =>
//   console.log(`<-----  Server listen on Port: ${process.env.PORT}  ----->`)
// );

import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000", credentials: true },
});

const onConnection = (socket) => {
  console.log(socket.handshake.auth);
  socket.on("chat", (data) => {
    console.log(data);
  });
};

io.on("connection", onConnection);

httpServer.listen(process.env.PORT, () => {
  console.log(`<-----  Server listen on Port: ${process.env.PORT}  ----->`);
});
