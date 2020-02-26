
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { register, login } = require('./auth/index');
const User = require('../models/account.model');
const { registerValidation } = require('./auth/account.validation');
const { loginValidation } = require('./auth/account.validation');

const salt = bcrypt.genSaltSync(10);

module.exports.registerController = async function registerController(
  req,
  res,
) {
  const emailReq = document.getElementById('#email').value;
  const passwordReq = document.getElementById('#password').value;
  const nameReq = document.getElementById('#name').value;
  const phoneReq = document.getElementById('#phone').value;

  // const emailReq = req.body.email;
  // const passwordReq = req.body.password;
  // const nameReq = req.body.name;
  // const phoneReq = req.body.phone;

  // check Validation
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //  Check exist Email
  const emailExist = await User.findOne({ email: emailReq });
  if (emailExist) {
    return res.status(400).send('Email Already Exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(passwordReq, salt);

  // Create new user
  const user = new User({
    email: emailReq,
    password: hashedPassword,
    name: nameReq,
    phone: phoneReq,
  });
  try {
    await user.save();
    res.send({ user: user.id });
  } catch (err) {
    res.status(400).send(err);
  }
  res.end();
};
// Login Controller

module.exports.loginController = async function loginController(req, res) {
  // const emailReq = req.body.email;
  // const passwordReq = req.body.password;

  const emailReq = document.getElementById('#email').value;
  const passwordReq = document.getElementById('#password').value;


  // Check Validation of email and password
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //  Check exist Email
  const user = await User.findOne({ email: emailReq });
  if (!user) {
    return res.status(400).send('Cant find your Email');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(passwordReq, salt);
  const checkPassword = await bcrypt.compareSync(passwordReq, hashedPassword);
  if (!checkPassword) {
    return res.status(400).send('Wrong Password');
  }

  const token = jwt.sign({ user: user.id }, process.env.TOKEN);

  res.send(token);
  res.end();
  alert('Succes');
};
