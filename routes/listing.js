const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Index and Create Routes
router
  .route("/")
  // Index Route
  .get(wrapAsync(listingController.index))
  // Create Route
  .post(
    isLoggedIn,
    upload.single("listing[image][url]"),
    // validateListing,
    wrapAsync(listingController.createListing)
  );

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Combined route for show, update, and delete operations
router
  .route("/:id")
  // Show Route
  .get(wrapAsync(listingController.showListing))
  // Update Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image][url]"),
    wrapAsync(listingController.updateListing)
  ) // Delete Route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
