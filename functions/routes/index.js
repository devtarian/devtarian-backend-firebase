const express = require("express");
const router = express.Router();

router.use("/main", require("./main"));
router.use("/auth", require("./auth"));
router.use("/store", require("./store"));
router.use("/wiki", require("./wiki"));

module.exports = router;
