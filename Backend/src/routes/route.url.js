const express = require("express");
const {
  generateNewShortCode,
  handleRedirect,getAnalytics,getAllUrls
} = require("../controllers/controller.url");

const router = express.Router();

// create short URL
router.post("/", generateNewShortCode);

// redirect
router.get("/analytics/:shortCode", getAnalytics);
router.get("/:shortCode", handleRedirect);
router.get("/all", getAllUrls);

module.exports = router;