const express = require("express");
const {
  generateNewShortCode,
  handleRedirect,
  getAnalytics,
  getAllUrls,
  deleteUrl
} = require("../controllers/controller.url");

const router = express.Router();

// create short URL
router.post("/", generateNewShortCode);
app.get("/test", (req, res) => {
    res.send("Backend Working");
});

// redirect
router.get("/all", getAllUrls);
router.get("/analytics/:shortCode", getAnalytics);
router.delete("/:shortCode", deleteUrl);
router.get("/:shortCode", handleRedirect);
module.exports = router;