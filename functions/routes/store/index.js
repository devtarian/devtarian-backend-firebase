const express = require("express");
const router = express.Router();
const {
    createStore,
    deleteStore,
    getStoreDetail,
    favoriteStore,
    unfavoriteStore,
    createReview,
    deleteReview,
    getComment,
    createComment,
    deleteComment,
    likeReview,
    unlikeReview,
} = require("./store.ctrl");
const { protect, filesUpload } = require("../../middleware");

router.post("/", protect, filesUpload, createStore);
router.delete("/:storeId", protect, deleteStore);
router.get("/:storeId", getStoreDetail);
router.post("/:storeId/favorite", protect, favoriteStore);
router.delete("/:storeId/unfavorite", protect, unfavoriteStore);
router.post("/:storeId/review", protect, filesUpload, createReview);
router.delete("/:storeId/review/:reviewId", protect, deleteReview);
router.get("/:storeId/review/:reviewId/comment", getComment);
router.post("/:storeId/review/:reviewId/comment", protect, createComment);
router.delete(
    "/:storeId/review/:reviewId/comment/:commentId",
    protect,
    deleteComment
);
router.post("/:storeId/review/:reviewId/like", protect, likeReview);
router.delete("/:storeId/review/:reviewId/unlike", protect, unlikeReview);

module.exports = router;

/**
 * @swagger
 * /store:
 *   post:
 *     tags: [Store]
 *     summary: 가게 정보 등록
 *     description: "body"
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
 */

/**
 * @swagger
 * /store/{storeId}:
 *   delete:
 *     tags: [Store]
 *     summary: 가게 정보 삭제
 *     description: "body"
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         description: "Bearer {token}"
 *       - name: "storeId"
 *         in: "path"
 *         description: "example: nszavgGiwL3M0qk2ixVP"
 *         required: true
 *         type: "string"
 *     consumes: "multipart/form-data"
 *     produces: "multipart/form-data"
 *     responses:
 *       200:
 *         description: Success(성공)
 */

/**
 * @swagger
 * /store/{storeId}:
 *   get:
 *     tags: [Store]
 *     summary: 가게 정보 조회
 *     description: "토큰 있을 시 즐겨찾기 여부 추가됌, 토큰없으면 false"
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         description: "Bearer {token}"
 *       - name: "storeId"
 *         in: "path"
 *         description: "example: nszavgGiwL3M0qk2ixVP"
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
 * /store/{storeId}/favorite:
 *   post:
 *     tags: [Store]
 *     summary: 가게 즐겨찾기 추가
 *     description: ""
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         description: "Bearer {token}"
 *         required: true
 *       - name: "storeId"
 *         in: "path"
 *         description: "example: nszavgGiwL3M0qk2ixVP"
 *         required: true
 *         type: "string"
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)
 */

/**
 * @swagger
 * /store/{storeId}/unfavorite:
 *   delete:
 *     tags: [Store]
 *     summary: 가게 즐겨찾기 삭제
 *     description: ""
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         description: "Bearer {token}"
 *         required: true
 *       - name: "storeId"
 *         in: "path"
 *         description: "example: nszavgGiwL3M0qk2ixVP"
 *         required: true
 *         type: "string"
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)
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
 *         description: "example: nszavgGiwL3M0qk2ixVP"
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
 */

/**
 * @swagger
 * /store/{storeId}/review/{reviewId}:
 *   delete:
 *     tags: [Store]
 *     summary: 리뷰 정보 삭제
 *     description: "body"
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         description: "Bearer {token}"
 *       - name: "reviewId"
 *         in: "path"
 *         description: "example: 7UtpenJNg997WQM2x3Vx"
 *         required: true
 *         type: "string"
 *     consumes: "multipart/form-data"
 *     produces: "multipart/form-data"
 *     responses:
 *       200:
 *         description: Success(성공)
 */

/**
 * @swagger
 * /store/{storeId}/review/{reviewId}/comment:
 *   get:
 *     tags: [Store]
 *     summary: 댓글 리스트 조회
 *     description: ""
 *     parameters:
 *       - name: "storeId"
 *         in: "path"
 *         description: "example: nszavgGiwL3M0qk2ixVP"
 *         required: true
 *         type: "string"
 *       - name: "reviewId"
 *         in: "path"
 *         description: "example: 7UtpenJNg997WQM2x3Vx"
 *         required: true
 *         type: "string"
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)
 *         schema:
 *           type: "array"
 *           items:
 *             $ref: "#/definitions/success_comment_get"
 */

/**
 * @swagger
 * /store/{storeId}/review/{reviewId}/comment:
 *   post:
 *     tags: [Store]
 *     summary: 리뷰 댓글 등록
 *     description: ""
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         description: "Bearer {token}"
 *         required: true
 *       - name: "storeId"
 *         in: "path"
 *         description: "example: nszavgGiwL3M0qk2ixVP"
 *         required: true
 *         type: "string"
 *       - name: "reviewId"
 *         in: "path"
 *         description: "example: 7UtpenJNg997WQM2x3Vx"
 *         required: true
 *         type: "string"
 *       - name: "request"
 *         in: "body"
 *         description: "user object that needs to be added"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/request_comment_post"
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)
 *         schema:
 *           $ref: "#/definitions/success_comment_post"
 */

/**
 * @swagger
 * /store/{storeId}/review/{reviewId}/comment/{commentId}:
 *   delete:
 *     tags: [Store]
 *     summary: 리뷰 댓글 삭제
 *     description: "body"
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         description: "Bearer {token}"
 *       - name: "commentId"
 *         in: "path"
 *         description: "example: ejE9Q09Kuchd00lRJNFn"
 *         required: true
 *         type: "string"
 *     consumes: "multipart/form-data"
 *     produces: "multipart/form-data"
 *     responses:
 *       200:
 *         description: Success(성공)
 */

/**
 * @swagger
 * /store/{storeId}/review/{reviewId}/like:
 *   post:
 *     tags: [Store]
 *     summary: 리뷰 좋아요
 *     description: ""
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         description: "Bearer {token}"
 *         required: true
 *       - name: "storeId"
 *         in: "path"
 *         description: "example: nszavgGiwL3M0qk2ixVP"
 *         required: true
 *         type: "string"
 *       - name: "reviewId"
 *         in: "path"
 *         description: "example: 7UtpenJNg997WQM2x3Vx"
 *         required: true
 *         type: "string"
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)
 */

/**
 * @swagger
 * /store/{storeId}/review/{reviewId}/unlike:
 *   delete:
 *     tags: [Store]
 *     summary: 리뷰 좋아요 취소
 *     description: ""
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         description: "Bearer {token}"
 *         required: true
 *       - name: "reviewId"
 *         in: "path"
 *         description: "example: 7UtpenJNg997WQM2x3Vx"
 *         required: true
 *         type: "string"
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)
 */
