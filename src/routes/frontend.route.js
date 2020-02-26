const express = require('express');


const router = express.Router();
const path = require('path');

router.use('/static', express.static(path.join(__dirname, 'public')));


router.get('/register.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates/register.css'));
});

router.get('/login.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates/login.css'));
});

router.get('/image', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates/login.jpg'));
});

module.exports = router;
