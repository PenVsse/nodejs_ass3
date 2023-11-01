var express = require("express");
var router = express.Router();
const userController = require("../controller/userController");
const { ensureAuthenticated, adminAuthenticated } = require("../config/auth");

// router.route("/manage").get(ensureAuthenticated, adminAuthenticated, userController.getUsers);
router.route("/login").get(userController.getLoginPage).post(userController.loginAccount);
router.route("/logout").get(userController.logoutAcount);
router.route("/register").get(userController.getRegisterPage).post(userController.createAccount);
router.route("/:id").get(ensureAuthenticated, userController.accountInfo).put(ensureAuthenticated, userController.updateAccountInfo);

module.exports = router;
