// const async = require("async");
// const { body, validationResult } = require("express-validator");

exports.index = (req, res) => {
  res.render("index", {
    title: "Message Board",
  });
};
