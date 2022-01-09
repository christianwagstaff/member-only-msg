const express = require("express");
const router = express.Router();

const message_controller = require("../controllers/messageController");

// Get Message Homepage
router.get("/", message_controller.index);

// GET LogIn Screen
router.get("/login", message_controller.login);

// GET Signup Screen
router.get("/signup", message_controller.signup);

module.exports = router;
