const router = require("express").Router();
const User = require("../models/user");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginValidation } = require("../validation/user");
const { registerValidation } = require("../validation/user");
//Register Router
router.post("/register", async (req, res) => {
  //check Validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //  Check exist Email
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email Already Exists");

  //Hash password
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create new user
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
    name: req.body.name,
    phone: req.body.phone
  });
  try {
    const saveUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
  res.end();
});

//Login Router
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  console.log(req.body);

  //  Check exist Email
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("Cant find your Email");

  //Hash password
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const checkPassword = await bcrypt.compareSync(
    req.body.password,
    hashedPassword
  );
  if (!checkPassword) return res.status(400).send("Wrong Password");

  const token = jwt.sign({ user: user._id }, process.env.TOKEN);

  res.send(token);
  res.end();
});

module.exports = router;
