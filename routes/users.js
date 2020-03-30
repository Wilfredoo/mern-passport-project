const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Users, regValidate } = require("../models/Users");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("Hello users api dog cat");
});

router.post("/register", (req, res) => {
  // validation
  const { error } = regValidate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      type: error.details[0].path[0],
      msg: error.details[0].message
    });
  }
  // new object
  const newUser = new Users({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  //check if email is registered
  Users.findOne({ email: req.body.email }).then(emailMatch => {
    if (emailMatch) {
      return res.status(400).json({
        status: "error",
        type: "username",
        msg: "username is registered already"
      });
    }
    //now hash that password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        //saving to db
        newUser
          .save()
          .then(post => res.json(post))
          .catch(err => console.error(err));
      });
    });
  });
});

// export
module.exports = router;
