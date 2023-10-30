var express = require("express");
var router = express.Router();
const userController = require("../controller/userController");

router.route("/login").get(userController.getLoginPage).post(userController.loginAccount);
router.route("/register").get(userController.getRegisterPage).post(userController.createAccount);

module.exports = router;
