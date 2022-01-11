const express = require("express");
const router = express.Router();

const index_controller = require("../controllers/indexController");
const board_controller = require("../controllers/boardController");

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
router.get("/submit", index_controller.submit_new);

//Post Submit new message
router.post("/submit", board_controller.post_to_board);

module.exports = router;
