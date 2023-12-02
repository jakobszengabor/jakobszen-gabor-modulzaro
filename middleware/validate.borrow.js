import { isValidUserId } from "../service/users.service.js";
import { isThatBookBorrowed, isValidBookId } from "../service/books.service.js";

const validateBorrowing = async (req, res, next) => {
  const userId = req.body.userId;
  const bookId = req.params.id;

  const isValidUser = await isValidUserId(userId);
  const isValidBook = await isValidBookId(bookId);
  const isTheBookFree = await isThatBookBorrowed(bookId);

  if (isValidUser && isValidBook && isTheBookFree) {
    next();
  } else {
    res.status(405).json({
      error: "Failed to something.",
      message: "Example: Something is wrong.",
    });
  }
};

export default validateBorrowing;
