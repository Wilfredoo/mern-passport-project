const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { dbURI } = require("./config/keys");
const users = require("./routes/users");

//connect
mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(() => console.log("connected to db"))
  .catch(err => console.log(err));

// routes
app.use("/api/users", users);

// listen
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening to ${port}`));
