const express = require("express");
const router = express.Router();

const {privateController} = require("../controllers/HomeController");
const {protect} = require("../middleware/auth");

router.route("/").get(protect,privateController.private);

module.exports = router;