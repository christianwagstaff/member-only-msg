const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");
const authentication_controller = require("../controllers/authenticationController");

// GET index router
router.get("/", user_controller.redirect_home);

// GET individul user's page
router.get(
  "/:id",
  authentication_controller.isAuth,
  user_controller.get_user_by_id
);

module.exports = router;
