const express = require("express");
const priceController = require("../controllers/price.controller");
const validate = require("../middleware/validate");

const router = express.Router();

router.get("/price", validate,priceController);

module.exports = router;
