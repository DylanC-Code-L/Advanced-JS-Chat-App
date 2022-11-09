import Express from "express";
import * as Controllers from "../Controllers/conversations.controllers.js";

const router = Express.Router();

router.post("/", Controllers.getConversation);
router.post("/new", Controllers.newMessage);
router.get("/user/:uid", Controllers.getConversationsByUser);
router.post("/read", Controllers.readNews);

export { router as ConversationsRoutes };
