const express = require("express");
const router = express.Router();
const { insertPost, fetchPost } = require("./post.ctrl");

// router.get("/", fetchPost);
router.post("/", insertPost);

module.exports = router;
