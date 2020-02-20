const router = require("express").Router();
const User = require("../models/user");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { registerValidation } = require("../validation/user");

router.post("/", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //  Check exist Email
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email Already Exists");

  //Hash password
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

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

module.exports = router;
