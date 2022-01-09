// const async = require("async");
const bcrypt = require("bcryptjs/dist/bcrypt");
// const { body, validationResult } = require("express-validator");
const passport = require("passport");

const Member = require("../models/member");
const Message = require("../models/message");
const Board = require("../models/board");

// GET Homepage
exports.index = (req, res, next) => {
  Message.find()
    .populate("user", { name: 1 })
    .populate("board", { name: 1 })
    .exec((err, messages) => {
      if (err) {
        return next(err);
      }
      // Succes send messages
      res.render("index", {
        title: "Message Board",
        messages,
        user: req.user ? true : false,
      });
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

// POST Login Screen
exports.post_login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
});

// POST Signup Screen
exports.post_signup = (req, res, next) => {
  Member.findOne({ username: req.body.username }, (err, member) => {
    if (err) {
      return next(err);
    }
    if (member) {
      return res.render("signup");
    }
    // No member found sign them up
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      // eslint-disable-next-line no-unused-vars
      const member = new Member({
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword,
        activeMember: false,
        icon: 1,
        dateJoined: new Date(),
      }).save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    });
  });
};
