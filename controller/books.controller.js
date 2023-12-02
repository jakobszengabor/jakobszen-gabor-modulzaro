import {
  getAllBooks,
  getAllBooksByAvailability,
  getBookByTitle,
  getOneBookById,
  borrowOneBook,
  returnOneBook,
  isValidBookId,
  isThatBookBorrowed,
} from "../service/books.service.js";

import { isThatBookBorrowedByThatUser } from "../service/users.service.js";

export const getBook = async (req, res) => {
  const available = req.query.available;
  const title = req.query.title;
  console.log(available, title);
  try {
    if (available == undefined && title == undefined) {
      const listOfBooks = await getAllBooks();

      res.status(200).send(listOfBooks);
    } else if (title == undefined) {
      //Only Available is given

      const listOfBooks = await getAllBooksByAvailability(available);
      res.status(200).send(listOfBooks);
    } else if (available === undefined) {
      //Only title is given
      const cleanedTitle = title.replaceAll(" ", "").toLowerCase();
      const listOfBooks = await getBookByTitle(cleanedTitle);

      res.status(200).send(listOfBooks);
    }
  } catch (err) {
    res.status(400).send({
      error: "Internal server error.",
      message: err.message,
    });
  }
};

export const getOneBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const isBookValid = await isValidBookId(bookId);

    if (isBookValid) {
      const getOneBook = await getOneBookById(bookId);
      res.status(200).send(getOneBook);
    } else {
      res.status(404).send({
        error: "Your request failed",
        message: "Requested book not found",
      });
    }
  } catch (err) {
    res.status(400).send({
      error: "Internal server error.",
      message: err.message,
    });
  }
};

export const patchBook = async (req, res) => {
  const bookId = req.params.id;
  const userId = req.body.userId;
  const isThisABorrowing = await isThatBookBorrowed(bookId);
  const isThisAReturning = await isThatBookBorrowedByThatUser(bookId);

  try {
    if (isThisABorrowing && !isThisAReturning) {
      const book = await borrowOneBook(bookId, userId);

      res.status(200).send(book);
    } else if (!isThisABorrowing && isThisAReturning) {
      const book = await returnOneBook(bookId, userId);
   
      res.status(200).send(book);
    }
  } catch (err) {
    res.status(400).send({
      error: "Internal server error.",
      message: err.message,
    });
  }
};
