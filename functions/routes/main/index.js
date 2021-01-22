const express = require("express");
const router = express.Router();
const { getMain, getMainMore } = require("./main.ctrl");

router.get("/", getMain);
router.get("/more", getMainMore);

module.exports = router;

/**
 * @swagger
 * /main:
 *   get:
 *     tags: [Main]
 *     summary: 메인 페이지 데이터
 *     description: ""
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         description: "Bearer {token}"
 *       - name: "lat"
 *         in: "query"
 *         description: "[Example] 33.450701"
 *       - name: "lng"
 *         in: "query"
 *         description: "[Example] 126.570667"
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)

 */

/**
 * @swagger
 * /main/more:
 *   get:
 *     tags: [Main]
 *     summary: 메인 페이지 추가 데이터
 *     description: ""
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         description: "Bearer {token}"
 *       - name: "type"
 *         in: "query"
 *         description: "store / rated / review / wiki"
 *         required: true
 *       - name: "lat"
 *         in: "query"
 *         description: "[Example] 33.450701"
 *       - name: "lng"
 *         in: "query"
 *         description: "[Example] 126.570667"
 *       - name: "page"
 *         in: "query"
 *         description: "1"
 *       - name: "limit"
 *         in: "query"
 *         description: "4"
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)

 */
