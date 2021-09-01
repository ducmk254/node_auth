const express = require("express");
const router = express.Router();

const { authController } = require("../controllers/HomeController");
const { login, register, resetPassword, forgotpassword } = authController;

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/resetpassword/:resetToken").put(resetPassword);
router.route("/forgotpassword").post(forgotpassword);
module.exports = router;
