import Express from "express";
import * as Controllers from "../Controllers/conversations.controllers.js";

const router = Express.Router();

router.post("/", Controllers.getConversation);
router.post("/new", Controllers.newMessage);
router.get("/user/:uid", Controllers.getConversationsByUser);

export { router as ConversationsRoutes };
