const async = require("async");
const { body, validationResult } = require("express-validator");

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
