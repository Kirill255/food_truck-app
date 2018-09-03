const express = require("express");
const router = express.Router();

const Account = require("../models/Account");

const auth = require("../middleware/auth");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// create strategy
passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  session: false
},
  Account.authenticate()
));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// /api/account/register , create new account, here a field username not email, because passport-local-mongoose so works
router.post("/register", (req, res, next) => {

  Account.register(new Account({ username: req.body.email }), req.body.password, err => {
    if (err) return next(err);

    res.json({ message: "Registered successfully" });
    // res.redirect("/login");
  });
});

// /api/account/login , pass our strategy, and generate a token
router.post("/login", passport.authenticate("local"), auth.generateAccessToken, (req, res, next) => {
  res.json({
    email: req.user.username,
    token: req.token
  });
  // res.redirect("/");
});

// /api/account/logout , check the token
router.get("/logout", auth.authenticate, (req, res, next) => {
  req.logout();
  res.json({ message: "Successfully logged out" });
  // res.redirect("/");
});

// /api/account/me , just a test route , check the token
router.get("/me", auth.authenticate, (req, res) => {
  res.json(req.user);
});


module.exports = router;
