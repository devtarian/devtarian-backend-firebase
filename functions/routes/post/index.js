const express = require("express");
const router = express.Router();
const { createPost, getPosts, getPostDetail } = require("./post.ctrl");
const { protect, filesUpload } = require("../../middleware");

router.get("/", getPosts);
router.post("/", protect, filesUpload, createPost);
router.get("/:postId", getPostDetail);

module.exports = router;

/**
 * @swagger
 * /post/{postId}:
 *   get:
 *     tags: [Store]
 *     summary: 가게 정보 조회
 *     description: ""
 *     parameters:
 *       - name: "postId"
 *         in: "path"
 *         description: "example: Yj4ejesvSThZuwdg9hxq"
 *         required: true
 *         type: "string"
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)
 *         schema:
 *           $ref: "#/definitions/result_post"
 */
