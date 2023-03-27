const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/users.route");
const { postRouter } = require("./routes/posts.route");
const { authentication } = require("./middleware/auth.middleware");
const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use(authentication);
app.use("/posts", postRouter);
app.use(cors());
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log("can't connect to db");
  }

  console.log("server is running at " + process.env.port);
});
