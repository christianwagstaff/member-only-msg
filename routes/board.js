const express = require("express");
const router = express.Router();

const board_controller = require("../controllers/boardController");

// GET index router
router.get("/", board_controller.redirect_home);

// GET individul board page
router.get("/:id", board_controller.get_board_by_id);

module.exports = router;
