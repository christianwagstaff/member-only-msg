const Member = require("../models/member");
const Message = require("../models/message");
// eslint-disable-next-line no-unused-vars
const Board = require("../models/board");

// GET Index page
exports.redirect_home = (req, res) => {
  res.redirect("/");
};

// GET Individual User
exports.get_user_by_id = (req, res, next) => {
  Member.findOne({ name: req.params.id }).exec((err, user) => {
    if (err) {
      return next(err);
    }
    Message.find({ user: user._id })
      .populate("user", { name: 1 })
      .populate("board", { name: 1 })
      .exec((err, messages) => {
        if (err) {
          return next(err);
        }
        // Succes send messages
        res.render("userScreen", {
          title: user.name,
          messages,
          user: req.user ? req.user : false,
          isCurrentUser:
            req.user._id.toString() === user._id.toString() ? true : false,
        });
      });
  });
};
