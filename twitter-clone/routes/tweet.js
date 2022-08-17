const express = require("express");
const { getTweets, addTweet, likeTweet } = require("../controllers/tweet");

const router = express.Router();

router.post("/", addTweet);
router.post("/like", likeTweet);
router.get("/:userId", getTweets);
module.exports = router;
