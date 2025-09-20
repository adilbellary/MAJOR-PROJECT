const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

// Controllers
const userController = require("../controllers/users.js");

// Signup Routes
router
  .route("/signup")
  // Render signup form
  .get(userController.renderSignupForm)
  // Handle user signup
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  // Render login form
  .get(userController.renderLoginForm)
  // Handle user login
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    userController.login
  );

// Handle user logout
router.get("/logout", userController.logout);

module.exports = router;
