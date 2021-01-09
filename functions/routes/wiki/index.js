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
router.post("/:wikiId/favorite", favoriteWiki);
router.delete("/:wikiId/unfavorite", unfavoriteWiki);
router.post("/:wikiId/comment", createWikiComment);
router.post("/:wikiId/comment/:commentId/like", likeWikiComment);
router.delete("/:wikiId/comment/:commentId/unlike", unLikeWikiComment);

module.exports = router;

/**
 * @swagger
 * /wiki:
 *   post:
 *     tags: [Wiki]
 *     summary: Wiki 등록
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
