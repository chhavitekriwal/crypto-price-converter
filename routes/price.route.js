const priceController = require("../controllers/price.controller");
const express = require("express");

const router = express.Router();

router.get("/price",priceController);

module.exports = router;