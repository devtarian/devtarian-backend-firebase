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
 *     parameters:
 *       - name: "lat"
 *         in: "query"
 *         description: "[Example] 33.450701"
 *         required: true
 *       - name: "lng"
 *         in: "query"
 *         description: "[Example] 126.570667"
 *         required: true
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)

 */
