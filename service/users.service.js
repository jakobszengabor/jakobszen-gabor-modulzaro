import * as db from "./db.service.js";

export const createNewUser = async (firstName, lastName, email, phone) => {
  const result = await db.query(
    "INSERT INTO users (first_name, last_name, email, phone) VALUES ($1, $2, $3, $4) RETURNING *",
    [firstName, lastName, email, phone]
  );
  return result.rows[0];
};

export const listAllBorrowedBooksByUser = async (userId) => {
  const result = await db.query(
    "SELECT books.* FROM books INNER JOIN users ON books.borrower = users.id WHERE users.id = $1;",
    [userId]
  );

  return result.rows;
};

export const deleteUserById = async (userId) => {
  const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING *;", [userId]);

  return result.rows[0];
};

// Validator services
export const isValidUserId = async (userId) => {
  const result = await db.query("SELECT id FROM users WHERE id = $1;", [userId]);

  return result.rows.length > 0;
};

export const hasBorrowedBooks = async (userId) => {
  const result = await db.query("SELECT borrower FROM books WHERE borrower = $1;", [userId]);

  return result.rows.length > 0;
};

export const isThatBookBorrowedByThatUser = async (userId, bookId) => {
  const result = await db.query("SELECT COUNT(*) FROM books WHERE id =  $1 AND  borrower = $2;", [
    bookId,
    userId,
  ]);

  return result == 1;
};

export const isThatBookBorrowedByAnyone = async (bookId) => {
  const result = await db.query(
    "SELECT COUNT(*) FROM books WHERE id = $1 AND borrower IS NOT NULL;",
    [bookId]
  );

  return result == 1;
};
