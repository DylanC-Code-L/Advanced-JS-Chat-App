import Express from "express";
import * as Controllers from "../Controllers/messages.controllers.js";

const router = Express.Router();

router.post("/", Controllers.newConversation);

export { router as MessagesRoutes };
