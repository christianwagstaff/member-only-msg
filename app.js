/* eslint-disable no-unused-vars */
const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Member = require("./models/member");
const bcrypt = require("bcryptjs/dist/bcrypt");

// Init Express
const app = express();

// If not in production mode, use dotenv to access .env file
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Set up Database Connection - MongoDB
const mongoDb = process.env.MONGODB_URI;
const mongoOpts = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
mongoose.connect(mongoDb, mongoOpts);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// TODO - Set up Routers
const indexRouter = require("./routes/index");

// TODO - Set up View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set up passport local authentication
passport.use(
  new LocalStrategy((username, password, done) => {
    Member.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // Password match! User log in
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password" });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  Member.findById(id, (err, member) => {
    done(err, member);
  });
});

// Use Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Global Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Use Public Path for static links
app.use(express.static(path.join(__dirname, "public")));

// Use Routers Initialized above
app.use("/", indexRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error Handler
app.use((err, req, res, next) => {
  // Set Locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
