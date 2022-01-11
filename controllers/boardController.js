// const async = require("async");
const { body, validationResult } = require("express-validator");

// eslint-disable-next-line no-unused-vars
const Member = require("../models/member");
const Message = require("../models/message");
const Board = require("../models/board");

// GET Index page
exports.redirect_home = (req, res) => {
  res.redirect("/");
};

// GET Individual Board
exports.get_board_by_id = (req, res, next) => {
  Board.findOne({ name: req.params.id }).exec((err, board) => {
    if (err) {
      return next(err);
    }
    Message.find({ board: board._id })
      .populate("user", { name: 1 })
      .populate("board", { name: 1 })
      .sort({ createdDate: -1 })
      .exec((err, messages) => {
        if (err) {
          return next(err);
        }
        // Succes send messages
        res.render("index", {
          title: board.name,
          messages,
          user: req.user ? true : false,
        });
      });
  });
};

// POST to board
exports.post_to_board = [
  // Sanitize and Validate Fields
  body("title", "Title is Required").trim().isLength({ min: 1 }).escape(),
  body("message", "Message is required").trim().isLength({ min: 1 }).escape(),

  // Process request after validation
  (req, res, next) => {
    // Check to see if user is authenticated with session ID
    if (req.session.passport.user === "undefined") {
      let err = new Error("user not found");
      return next(err);
    }

    const errors = validationResult(req);

    // Create Message Obj with escaped and trimmed data
    let message = new Message({
      title: req.body.title,
      createdDate: new Date(),
      user: req.session.passport.user,
      message: req.body.message,
      boaard: req.body.board,
    });

    // Check for validation errors
    if (!errors.isEmpty()) {
      // There are errors. send the data back for correction
      res.status(400).json({ message, errors: errors.array() });
      return;
    } else {
      Board.find({ name: req.body.board }).exec((err, result) => {
        const board = result[0];
        if (err) {
          return next(err);
        }
        // Check to see if board exists
        if (board == null) {
          let err = new Error("No Board Found");
          return next(err);
        }
        // Success add board to message and save
        message.board = board;
        message.save((err) => {
          if (err) {
            return next(err);
          }
          res.redirect(board.url);
        });
      });
    }
  },
];
