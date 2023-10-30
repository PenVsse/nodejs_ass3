var express = require("express");
var router = express.Router();
const orchidController = require("../controller/orchidController");
const { ensureAuthenticated, adminAuthenticated } = require("../config/auth");

router.route("/").get(orchidController.index);
router.route("/:id").get(adminAuthenticated, orchidController.detail);

module.exports = router;
