const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const cors = require("cors");
const helmet = require("helmet");

const passport = require("passport");

// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");

const foodtruckRouter = require("./routes/foodtruck");
const accountRouter = require("./routes/account");

const app = express();

app.use(cors());
app.use(helmet());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

app.use("/api/foodtruck", foodtruckRouter);
app.use("/api/account", accountRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message);
});


module.exports = app;
