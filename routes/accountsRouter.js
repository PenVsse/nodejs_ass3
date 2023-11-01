var express = require("express");
var router = express.Router();
const accountController = require("../controller/accountController");
const { ensureAuthenticated, adminAuthenticated } = require("../config/auth");

router.route("/").get(ensureAuthenticated, adminAuthenticated, accountController.index);

module.exports = router;
