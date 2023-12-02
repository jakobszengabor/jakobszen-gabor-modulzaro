import {
  isValidUserId,
  isThatBookBorrowedByThatUser,
  isThatBookBorrowedByAnyone,
} from "../service/users.service.js";
import { isValidBookId } from "../service/books.service.js";

const validateReturning = async (req, res, next) => {
  const userId = req.body.userId;
  const bookId = req.params.id;

  const isValidUser = await isValidUserId(userId);
  const isValidBook = await isValidBookId(bookId);
  const isThatBookBorrowed = await isThatBookBorrowedByThatUser(userId, bookId);
  //const isThatBookFree = await isThatBookBorrowedByAnyone(bookId);

  if (isValidUser && isValidBook) {
    if (!isThatBookBorrowed && !isThatBookFree) {
      next();
    }
  } else {
    res.status(405).json({
      error: "Failed to something.",
      message: "Example: Something is wrong.",
    });
  }
};

export default validateReturning;
