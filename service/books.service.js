import * as db from "./db.service.js";
// "/Books" - get HTTP request functions with query
export const getAllBooks = async () => {
  const result = await db.query("SELECT * FROM books;");

  return result.rows;
};

export const getAllBooksByAvailability = async (available) => {
  if (available == "true") {
    const result = await db.query("SELECT * FROM books WHERE borrower IS NULL");
    return result.rows;
  } else {
    const result = await db.query("SELECT * FROM books WHERE borrower IS NOT NULL");
    return result.rows;
  }
};

export const getBookByTitle = async (title) => {
  const result = await db.query(
    `SELECT 
    id,
	title,
	author,
	category,
	borrower,
	borrowing_date,
	return_date,
    REPLACE(
        LOWER(title), 
        ' ', 
        ''
    ) AS modified_title 
FROM 
    books
WHERE
    REPLACE(
        LOWER(title), 
        ' ', 
        ''
    ) = $1;`,
    [title]
  );

  return result.rows;
};
// "/Books" - get HTTP request functions with query - END

export const getOneBookById = async (id) => {
  const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
  return result.rows[0];
};

export const checkBookId = async (bookId) => {
  const result = await db.query("SELECT borrower FROM books WHERE ");
};

export const borrowOneBook = async (bookId, UserId) => {
  const result = await db.query(
    "UPDATE books SET borrowing_date = CURRENT_TIMESTAMP, borrower = $1, return_date = NULL WHERE id = $2 RETURNING *;",
    [UserId, bookId]
  );

  return result.rows[0];
};

export const returnOneBook = async (bookId, UserId) => {
  const result = await db.query(
    "UPDATE books SET borrowing_date = NULL, borrower = NULL, return_date = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;",
    [bookId]
  );
  return result.rows[0];
};

//Validating services
export const isValidBookId = async (bookId) => {
  const result = await db.query("SELECT id FROM books WHERE id = $1;", [bookId]);
  console.log(result.rows.length);
  return result.rows.length > 0;
};

export const isThatBookBorrowed = async (bookId) => {
  const result = await db.query("SELECT COUNT(*) as borrowed FROM books WHERE id = $1;", [bookId]);
  console.log(result.rows.length);
  return result.rows.length > 0;
};
