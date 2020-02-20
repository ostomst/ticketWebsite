const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  phone: {
    type: String,
    required: true,
    min: 6,
    max: 255
  }
});

module.exports = mongoose.model("User", userSchema);
