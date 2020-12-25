const express = require("express");
const router = express.Router();
const { createPost, getPosts } = require("./post.ctrl");
const { protect, filesUpload } = require("../../middleware");

router.get("/", getPosts);
router.post("/", protect, filesUpload, createPost);

module.exports = router;
