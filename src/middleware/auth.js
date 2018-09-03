const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

const config = require("../config");

// const TOKENTIME = 60 * 60 * 24 * 30; // 30 days
// const SECRET = "fEsp jw lwad oqsakjwf";

const TOKENTIME = config.auth.TOKENTIME;
const SECRET = config.auth.SECRET;

let authenticate = expressJwt({ secret: SECRET });

let generateAccessToken = (req, res, next) => {
  req.token = jwt.sign({ id: req.user.id, }, SECRET, { expiresIn: TOKENTIME });
  next();
};


module.exports = { authenticate, generateAccessToken };
