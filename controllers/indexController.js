const async = require("async");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

const Member = require("../models/member");
const Message = require("../models/message");
// eslint-disable-next-line no-unused-vars
const Board = require("../models/board");

// GET Homepage
exports.index = (req, res, next) => {
  Message.find()
    .populate("user", { name: 1 })
    .populate("board", { name: 1 })
    .sort({ createdDate: -1 })
    .exec((err, messages) => {
      if (err) {
        return next(err);
      }
      // Succes send messages
      res.render("index", {
        title: "Message Board",
        messages,
        user: req.user ? req.user : false,
      });
    });
};

// GET Login Screen
exports.login = (req, res) => {
  res.render("login", {
    title: "Log In",
    user: req.user ? true : false,
  });
};

// GET Signup Screen
exports.signup = (req, res) => {
  res.render("signup", {
    title: "Sign Up",
    user: req.user ? true : false,
    errors: {},
  });
};

// GET Logout
exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

// GET Sumbit
exports.submit_new = (req, res, next) => {
  Board.find({}, { name: 1 }).exec((err, boards) => {
    if (err) {
      return next(err);
    }
    // Successful, render page
    res.render("newItem", {
      user: req.user ? req.user : false,
      boards,
    });
  });
};

// POST Login Screen
exports.post_login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
});

// POST Signup Screen
exports.post_signup = [
  body("displayName", "Display Name is Required")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape(),
  body("username", "Email is Required")
    .trim()
    .isLength({ min: 1 })
    .isEmail()
    .escape(),
  body("password", "Password is Required").exists(),
  body("password-confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    // Passwords do match so return true
    return true;
  }),

  (req, res, next) => {
    // Extract the validation errors
    const errors = validationResult(req);
    let member = new Member({
      name: req.body.displayName,
      username: req.body.username,
      password: req.body.password,
      activeMember: false,
      icon: 1,
      dateJoined: new Date(),
    });
    if (!errors.isEmpty()) {
      // There are errors. Send the data back for correction
      return res.status(400).json({ errors: errors.array() });
    } else {
      // Data is Valid
      // Check if a memeber alredy exists with that email or displayname
      async.parallel(
        {
          email: (callback) =>
            Member.findOne({ username: req.body.username }).exec(callback),
          displayName: (callback) =>
            Member.findOne({ name: req.body.displayName }).exec(callback),
        },
        (err, results) => {
          if (err) {
            return next(err);
          }
          if (results.email) {
            // email already in use
            console.log("Email in use");
            console.log(results.email);
            res.render("signup", {
              user: req.user ? req.user : false,
              title: "Sign Up",
              errors: {
                location: "username",
                value: "Email Already In Use",
              },
            });
            return;
          }
          if (results.displayName) {
            console.log("Email in use");

            // display name alreay in use
            res.render("signup", {
              user: req.user ? req.user : false,
              title: "Sign Up",
              error: {
                location: "displayName",
                value: "Username Already In Use",
              },
            });
            return;
          }
          // No member found sign them up
          bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
              return next(err);
            }
            member.password = hashedPassword;
            member.save((err) => {
              if (err) {
                return next(err);
              }
              next();
            });
          });
        }
      );
    }
  },
  // User Created, Authroize the user and redirect
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
];
