const express = require('express');

const router = express.Router();
const path = require('path');
const { registerController, loginController } = require('../controllers/account.controller');

router.use('/static', express.static(path.join(__dirname, 'public')));

router.get('/login', (req, res) => {
  res.render('login.pug');
});

router.get('/register', (req, res) => {
  res.render('register.pug');
});

router.post('/login', loginController);

router.post('/register', registerController);


module.exports = router;
