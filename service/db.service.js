import pg from "pg";
import "dotenv/config";

const pool = new pg.Pool({
  user: process.env.DB_USER,
  password: process.env.DB_USER_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

export const query = (text, param) => pool.query(text, param);
