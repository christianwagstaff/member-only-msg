// const async = require("async");
// const { body, validationResult } = require("express-validator");

// GET Homepage
exports.index = (req, res) => {
  res.render("index", {
    title: "Message Board",
  });
};

// GET Login Screen
exports.login = (req, res) => {
  res.render("login", {
    title: "Log In",
  });
};

// GET Signup Screen
exports.signup = (req, res) => {
  res.render("signup", {
    title: "Sign Up",
  });
};
