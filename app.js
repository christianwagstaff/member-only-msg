const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs/dist/bcrypt");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("bcryptjs");

const mongoDb = process.env.MONGODB_URI;
const mongoOpts = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
mongoose.connect(mongoDb, mongoOpts);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
