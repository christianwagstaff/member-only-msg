/* eslint-disable no-unused-vars */
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs/dist/bcrypt");

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
