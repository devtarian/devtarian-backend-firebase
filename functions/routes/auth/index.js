const express = require("express");
const router = express.Router();
const { filesUpload, protect } = require("../../middleware");
const { signIn, signUp, getUser } = require("./auth.ctrl");

router.post("/signin", signIn);
router.post("/signup", filesUpload, signUp);
router.get("/me", protect, getUser);

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
 *         schema:
 *           $ref: "#/definitions/signinSuccess"
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags: [Auth]
 *     summary: 회원가입
 *     description: ""
 *     parameters:
 *       - name: "body"
 *         in: "formData"
 *         description: "Models -> SignupInsertRequest 참고"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/SignupInsertRequest"
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
 *           $ref: "#/definitions/signinSuccess"
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: 내 정보 (My info)
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         description: "Bearer {token}"
 *         required: true
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
