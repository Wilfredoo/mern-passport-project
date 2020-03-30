const jwt = require("jsonwebtoken");
const keys = require("./keys");
//creating middleware function

module.exports = function(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");
  try {
    const verified = jwt.verify(token, keys.secretKey);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).send("invalid token");
  }
};
