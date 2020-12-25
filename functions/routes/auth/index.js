const express = require("express");
const router = express.Router();
const { signIn, signUp } = require("./auth.ctrl");
const { filesUpload } = require("../../middleware");

router.post("/signin", signIn);
router.post("/signup", filesUpload, signUp);

module.exports = router;

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     tags: [Auth]
 *     summary: 로그인
 *     description: ""
 *     parameters:
 *       - name: "request"
 *         in: "body"
 *         description: "user object that needs to be added"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/signin"
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)
 *       400:
 *         description: Bad request (잘못된 요청)
 *       500:
 *         description: Interval Server Error
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: 회원가입
 *     description: ""
 *     parameters:
 *       - name: "request"
 *         in: "body"
 *         description: "user object that needs to be added"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/User"
 *     consumes: "multipart/form-data"
 *     produces: "multipart/form-data"
 *     responses:
 *       200:
 *         description: Success(성공)
 *       400:
 *         description: Bad request (잘못된 요청)
 *       500:
 *         description: Interval Server Error
 */
