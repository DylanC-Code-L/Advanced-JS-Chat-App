import Express from "express";
import * as Controllers from "../Controllers/users.controllers.js";

const router = Express.Router();

router.post("/", Controllers.addUser);
router.post("/login", Controllers.userLogIn);
router.get("/all", Controllers.getUsers);
router.get("/:pseudo", Controllers.getUsersByName);

export { router as UsersRoutes };
