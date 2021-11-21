const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

require("./db");

const app = express();

dotenv.config();

const usersRouter = require("./routers/routs/users");

const postsRouter = require("./routers/routs/posts");

const likesRouter = require("./routers/routs/likes");


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/likes", likesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
