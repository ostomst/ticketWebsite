const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

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

//Home page
app.get("/", (req, res) => {
  res.send("You are in HomePage");
});

//Register/Login page
app.use("/user", userRouter);

//Movie

app.listen(port, () => console.log("Live on " + port));
