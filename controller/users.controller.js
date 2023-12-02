import {
  createNewUser,
  listAllBorrowedBooksByUser,
  isValidUserId,
  hasBorrowedBooks,
  deleteUserById,
} from "../service/users.service.js";

export const createUser = async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;

  try {
    const newUser = await createNewUser(firstName, lastName, email, phone);

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({
      error: "Failed to register new user",
      message: err.message,
    });
  }
};

export const userBookList = async (req, res) => {
  const userId = req.params.id;
  const isValid = await isValidUserId(userId);

  try {
    if (isValid) {
      const listOfBooks = await listAllBorrowedBooksByUser(userId);

      res.status(200).json(listOfBooks);
    } else {
      res.status(404).json({
        error: "Request was failed!",
        message: "User ID was not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: "Failed to register new user",
      message: err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const isUserBorrowedBook = await hasBorrowedBooks(userId);
  const isValid = await isValidUserId(userId);

  try {
    if (isValid === false) {
      res.status(404).json({
        error: "Request is failed!",
        message: "User Id Not Found.",
      });
    } else if (isUserBorrowedBook === true) {
      res.status(400).json({
        error: "Internal Server error",
        message: "Cant delete user who has an active borrowing",
      });
    } else {
      const deletedUser = await deleteUserById(userId);
      res.status(200).json(deletedUser);
    }
  } catch (err) {
    res.status(400).json({
      error: "Internal Server error",
      message: err.message,
    });
  }
};
