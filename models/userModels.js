const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "fill out this field"],
  },
  lastName: {
    type: String,
    required: [true, "fill out this field"],
  },
  email: {
    type: String,
    required: [true, "fill out this field"],
  },
  password: {
    type: String,
    required: [true, "fill out this field"],
  },
});

const userModel = model("users", userSchema);

module.exports = userModel
