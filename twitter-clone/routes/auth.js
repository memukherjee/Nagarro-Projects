const express = require("express");
const router = express.Router();
const {authenticateGoogle, authenticateGoogleCallback} = require("../controllers/auth");

router.get("/google", authenticateGoogle);
router.get("/google/callback", authenticateGoogleCallback);

module.exports = router;
