const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortUrl,
  handleRedirectUrl,
  handleGetAnalytics,
} = require("../controllers/url");

router.post("/", handleGenerateNewShortUrl);
router.get("/:shortId", handleRedirectUrl); 
router.get("/analytics/:shortId", handleGetAnalytics);


module.exports = router;
