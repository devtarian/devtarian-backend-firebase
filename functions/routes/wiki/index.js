const express = require("express");
const router = express.Router();
const { protect, filesUpload } = require("../../middleware");
const {
    createWiki,
    getWiki,
    getWikiDetail,
    favoriteWiki,
    unfavoriteWiki,
    createWikiComment,
    likeWikiComment,
    unLikeWikiComment,
} = require("./wiki.ctrl");

router.get("/", getWiki);
router.post("/", protect, filesUpload, createWiki);
router.get("/:wikiId", getWikiDetail);
router.post("/:wikiId/favorite", protect, favoriteWiki);
router.delete("/:wikiId/unfavorite", protect, unfavoriteWiki);
router.post("/:wikiId/comment", protect, createWikiComment);
router.post("/:wikiId/comment/:commentId/like", protect, likeWikiComment);
router.delete("/:wikiId/comment/:commentId/unlike", protect, unLikeWikiComment);

module.exports = router;

/**
 * @swagger
 * /wiki:
 *   get:
 *     tags: [Wiki]
 *     summary: 비건 편의점 목록 조회
 *     description: ""
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         description: "Bearer {token} / 토큰이 유효한경우 favorite 여부 나옴"
 *       - name: "category"
 *         in: "query"
 *         description: "all / processed / snack / bread / drink / etc "
 *       - name: "page"
 *         in: "query"
 *         description: "1 (시작 페이지)"
 *       - name: "limit"
 *         in: "query"
 *         description: "20 (데이터 개수)"
 *       - name: "order"
 *         in: "query"
 *         description: "createdAt / productDesc / productAsc"
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)

 */

/**
 * @swagger
 * /wiki:
 *   post:
 *     tags: [Wiki]
 *     summary: 비건 편의점 상품 등록
 *     description: ""
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         description: "Bearer {token}"
 *         required: true
 *       - name: "body"
 *         in: "formData"
 *         description: "Models -> request_wiki_post 참고"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/request_wiki_post"
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
 *           $ref: "#/definitions/success_wiki_post"
 */

/**
 * @swagger
 * /wiki/{wikiId}:
 *   get:
 *     tags: [Wiki]
 *     summary: 비건 편의점 상세정보 조회
 *     description: ""
 *     parameters:
 *       - name: "wikiId"
 *         in: "path"
 *         description: "example: UqHcUaYWye5D1wb2WIY9"
 *         required: true
 *         type: "string"
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)
 *         schema:
 *           $ref: "#/definitions/success_wikiDetail_post"
 */

/**
 * @swagger
 * /wiki/{wikiId}/favorite:
 *   post:
 *     tags: [Wiki]
 *     summary: 비건 편의점 상품 즐겨찾기 추가
 *     description: ""
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         description: "Bearer {token}"
 *         required: true
 *       - name: "wikiId"
 *         in: "path"
 *         description: "example: UqHcUaYWye5D1wb2WIY9"
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
 * /wiki/{wikiId}/unfavorite:
 *   delete:
 *     tags: [Wiki]
 *     summary: 비건 편의점 상품 즐겨찾기 해제
 *     description: ""
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         description: "Bearer {token}"
 *         required: true
 *       - name: "wikiId"
 *         in: "path"
 *         description: "example: UqHcUaYWye5D1wb2WIY9"
 *         required: true
 *         type: "string"
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)
 */
