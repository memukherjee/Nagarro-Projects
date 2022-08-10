const express = require("express");

const { getLoginPage } = require("../controllers");

const router = express.Router();

router.get("/", getLoginPage);
module.exports = router;
