import express from "express";
import * as booksController from "../controller/books.controller.js";
import validateBorrowing from "../middleware/validate.borrow.js";
import validateReturning from "../middleware/validate.return.js";

const router = express.Router();

router.get("/", booksController.getBook);
router.get("/:id", booksController.getOneBook);
router.patch("/:id", validateBorrowing, validateReturning, booksController.patchBook);

export default router;
