const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// get models
router.get("/", (req, res) => {
  res.send("Hello users api dog cat");
});

// export
module.exports = router;
