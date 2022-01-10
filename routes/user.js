const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

// GET index router
router.get("/", user_controller.redirect_home);

// GET individul board page
router.get("/:id", user_controller.get_user_by_id);

module.exports = router;
