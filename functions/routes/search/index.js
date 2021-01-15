const express = require("express");
const router = express.Router();
const { getSearch } = require("./search.ctrl");

router.get("/", getSearch);

module.exports = router;

/**
 * @swagger
 * /search:
 *   get:
 *     tags: [Search]
 *     summary: 검색 데이터 조회
 *     description: ""
 *     parameters:
 *       - name: "Authorization"
 *         in: "header"
 *         description: "Bearer {token}"
  *       - name: "q"
 *         in: "query"
 *         required: true
 *         description: "서울"
 *       - name: "lat"
 *         in: "query"
 *         required: true
 *         description: "[Example] 33.450701"
 *       - name: "lng"
 *         in: "query"
 *         description: "[Example] 126.570667"
 *         required: true
 *       - name: "category"
 *         in: "query"
 *         description: "restaurant"
 *       - name: "page"
 *         in: "query"
 *         description: "1"
 *       - name: "limit"
 *         in: "query"
 *         description: "10"
 *       - name: "order"
 *         in: "query"
 *         description: "distance / rated"
 *     consumes: "application/json"
 *     produces: "application/json"
 *     responses:
 *       200:
 *         description: Success(성공)

 */
