const express = require("express");
const {
  generateNewShortCode,
  handleRedirect
} = require("../controllers/controller.url");

const router = express.Router();

// create short URL
router.post("/", generateNewShortCode);

// redirect
router.get("/:shortCode", handleRedirect);

module.exports = router;