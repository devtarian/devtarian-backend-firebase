const express = require("express");
const router = express.Router();
const { filesUpload, protect } = require("../../middleware");
const { signIn, signUp, getUser, refreshToken } = require("./auth.ctrl");

router.post("/signin", signIn);
router.post("/signup", filesUpload, signUp);
router.get("/me", protect, getUser);
router.post("/gettoken", refreshToken);

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
 *           $ref: "#/definitions/request_signin_post"
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)
 *         schema:
 *           $ref: "#/definitions/success_signin_post"
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
 *         description: "Models -> request_signup_post 참고"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/request_signup_post"
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
 *           $ref: "#/definitions/success_signin_post"
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
 *         schema:
 *           $ref: "#/definitions/success_auth_me_get"
 */
