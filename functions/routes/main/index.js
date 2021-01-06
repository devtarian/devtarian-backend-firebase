const express = require("express");
const router = express.Router();
const { getMain } = require("./main.ctrl");

router.get("/", getMain);

module.exports = router;

/**
 * @swagger
 * /main:
 *   get:
 *     tags: [Main]
 *     summary: 메인 페이지 데이터
 *     description: ""
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)
 *         schema:
 *           $ref: "#/definitions/result_post"
 */
