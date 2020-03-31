const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const keys = require("../config/keys");
const { Users, regValidate, logValidate } = require("../models/Users");
const passport = require("passport");

//authentication
const auth = require("../config/auth");

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

router.post("/login", (req, res) => {
  const { error } = logValidate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      type: error.details[0].path[0],
      msg: error.details[0].message
    });
  }

  Users.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(400).json({
        status: "error",
        type: "email",
        msg: "That email is not registered"
      });
    }

    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      console.log("doggo", req.body, isMatch);
      if (isMatch) {
        console.log("it is known");
        // generate token
        const payload = {
          id: user.id,
          user: user.username,
          email: user.email
        };
        jwt.sign(payload, keys.secretKey, { expiresIn: 3600 }, (err, token) => {
          // how to get user from token
          const decode = jwt_decode(token);

          res.json({
            success: true,
            token: "Bearer " + token,
            decode: decode
          });
        });
      } else {
        console.log("nanana");
        return res.status(400).json({
          status: "error",
          type: "password",
          msg: "Passwords do no match"
        });
      }
    });
  });
});

// router.get("/current", auth, (req, res) => {
//   res.send("Success, you can now visit this route traveler");
// });

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("Success, you can now visit this route traveler");
  }
);

// export
module.exports = router;
