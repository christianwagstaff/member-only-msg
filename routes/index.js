const express = require("express");
const router = express.Router();

const member_controller = require("../controllers/messageController");

// Get Message Homepage
router.get("/", member_controller.index);

// GET LogIn Screen
router.get("/login", member_controller.login);

// GET Signup Screen
router.get("/signup", member_controller.signup);

// POST Login
router.post("/login", member_controller.post_login);

// POST Signup
router.post("/signup", member_controller.post_signup);

module.exports = router;
