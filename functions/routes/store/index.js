const express = require("express");
const router = express.Router();
const {
    createStore,
    getStore,
    createReview,
    getComment,
    createComment,
} = require("./store.ctrl");
const { protect, filesUpload } = require("../../middleware");

router.post("/", protect, filesUpload, createStore);
router.get("/:storeId", getStore);
router.post("/:storeId/review", protect, filesUpload, createReview);
router.get("/:storeId/review/:reviewId/comment", getComment);
router.post("/:storeId/review/:reviewId/comment", protect, createComment);

module.exports = router;

/**
 * @swagger
 * /store/{storeId}:
 *   get:
 *     tags: [Store]
 *     summary: 가게 정보 조회
 *     description: ""
 *     parameters:
 *       - name: "storeId"
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
 *           $ref: "#/definitions/result_store"
 */
