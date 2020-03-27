const mongoose = require("mongoose");
const Joi = require("joi");
// schema

const userSchema = new mongoose.newSchema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: new Date()
  }
});

//model

const Users = new mongoose.model("users", userSchema);

// validation

exports.Users = Users;
