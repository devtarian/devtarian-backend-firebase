const express = require("express");
const router = express.Router();
const { createPost, fetchPost } = require("./post.ctrl");
const { protect, filesUpload } = require("../../middleware");

// router.get("/", fetchPost);
router.post("/", protect, filesUpload, createPost);

module.exports = router;
