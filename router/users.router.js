import express from "express";
import * as usersController from "../controller/users.controller.js";

const router = express.Router();

router.post("/", usersController.createUser);
router.get("/:id/books", usersController.userBookList);
router.delete("/:id", usersController.deleteUser);

export default router;
