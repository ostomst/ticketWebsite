const express = require("express");
const expressSession = require("express-session");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const pug = require("pug");

const app = express();
const port = 3000;

//Load environment variable
dotenv.config();

//Connect to database MongoDB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to Database")
);

//Router
const userRouter = require("./routes/user");

app.use(express.json());
app.set("view engine", "pug");
app.set("views", "views");

//Home page
app.get("/user/login", (req, res) => {
  res.render("login");
});

//Register/Login page
app.use("/user", userRouter);

//Movie

app.listen(port, () => console.log("Live on " + port));
