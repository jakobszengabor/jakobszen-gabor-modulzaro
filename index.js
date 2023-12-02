import express from "express";
import "dotenv/config";
import booksRouter from "./router/books.router.js";
import usersRouter from "./router/users.router.js";
import logUrlAndMethod from "./middleware/logging.URL.Method.js";

const app = express();
const port = process.env.PORT;
const host = process.env.DB_HOST;

app.use(logUrlAndMethod);
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "<html style='background-color: grey'><h1>Node.js modulzáró - Jakobszen Gábor</h1></html>"
  );
});

app.use("/books", booksRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is listening on:    http://${host}:${port}`);
});
