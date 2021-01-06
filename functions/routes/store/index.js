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
 * /store:
 *   post:
 *     tags: [Store]
 *     summary: 가게 정보 등록
 *     description: ""
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         description: "Bearer {token}"
 *         required: true
 *       - name: "body"
 *         in: "formData"
 *         description: "Models -> request_store_post 참고"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/request_store_post"
 *       - name: "file"
 *         in: "formData"
 *         description: "이미지 업로드"
 *         required: true
 *         type: "file"
 *     consumes: "multipart/form-data"
 *     produces: "multipart/form-data"
 *     responses:
 *       200:
 *         description: Success(성공)
 *         schema:
 *           $ref: "#/definitions/request_store_post"
 */

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
 *         description: "example: 0NVdtZRHFEmoQ0qKV0us"
 *         required: true
 *         type: "string"
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)
 *         schema:
 *           $ref: "#/definitions/success_store_get"
 */

/**
 * @swagger
 * /store/{storeId}/review:
 *   post:
 *     tags: [Store]
 *     summary: 가게 리뷰 등록
 *     description: ""
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         description: "Bearer {token}"
 *         required: true
 *       - name: "storeId"
 *         in: "path"
 *         description: "example: 0NVdtZRHFEmoQ0qKV0us"
 *         required: true
 *         type: "string"
 *       - name: "body"
 *         in: "formData"
 *         description: "Models -> request_review_post 참고"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/request_review_post"
 *       - name: "file"
 *         in: "formData"
 *         description: "이미지 업로드"
 *         required: true
 *         type: "file"
 *     consumes: "multipart/form-data"
 *     produces: "multipart/form-data"
 *     responses:
 *       200:
 *         description: Success(성공)
 *         schema:
 *           $ref: "#/definitions/request_review_post"
 */
