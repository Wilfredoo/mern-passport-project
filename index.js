const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const { dbURI } = require("./config/keys");
const users = require("./routes/users");
const products = require("./routes/products");

const passport = require("passport");

// auth with passport
app.use(passport.initialize());

require("./config/passport")(passport);

//connect
mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(() => console.log("connected to db"))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api/users", users);

// listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening to ${port}`));
