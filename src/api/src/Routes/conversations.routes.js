import Express from "express";
import * as Controllers from "../Controllers/conversations.controllers.js";

const router = Express.Router();

router.post("/", Controllers.newConversation);
router.post("/new", Controllers.newMessage);
router.get("/user/:id", Controllers.getConversations);

export { router as ConversationsRoutes };
