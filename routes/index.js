const express = require("express");
const router = express.Router();

const message_controller = require("../controllers/messageController");

// Get Message Homepage
router.get("/", message_controller.index);

module.exports = router;
