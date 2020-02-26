const express = require('express');
// const browserify = require("browerify");
// const expressSession = require("express-session");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const cons = require('consolidate');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Load environment variable
dotenv.config();
// app.engine("html", cons.swig);

// Connect to database MongoDB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to Database'),
);

app.use('/static', express.static(path.join(__dirname, 'public')));

// Router
const userRouter = require('./routes/account.route');
const fontEndRouter = require('./routes/frontend.route');

app.use(express.json());
app.set('view engine', 'pug');
app.set('views', './src/templates');
app.use(bodyParser.json());


app.use('/', userRouter);
app.use('/frontend', fontEndRouter);

app.get('/script', (req, res) => {
  res.sendFile(path.join(__dirname, './bundle.js'));
});

app.get('/home', (req, res) => {
  res.send('Nice');
  alert('OK');
});


app.listen(port, () => {
  console.log(`Live on ${port}`);
});
