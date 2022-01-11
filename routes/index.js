const express = require("express");
const router = express.Router();

const index_controller = require("../controllers/indexController");
const board_controller = require("../controllers/boardController");
const authentication_controller = require("../controllers/authenticationController");

// Get Message Homepage
router.get("/", index_controller.index);

// GET LogIn Screen
router.get("/login", index_controller.login);

// GET Signup Screen
router.get("/signup", index_controller.signup);

// POST Login
router.post("/login", index_controller.post_login);

// POST Signup
router.post("/signup", index_controller.post_signup);

// POST Logout
router.get("/logout", index_controller.logout);

// GET New Message
router.get(
  "/submit",
  authentication_controller.isAuth,
  index_controller.submit_new
);

//Post Submit new message
router.post(
  "/submit/message",
  authentication_controller.isAuth,
  board_controller.post_to_board
);

// Post Submit new board
router.post(
  "/submit/board",
  authentication_controller.isAuth,
  board_controller.post_new_board
);

module.exports = router;
