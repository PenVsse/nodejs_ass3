var express = require("express");
var router = express.Router();
const orchidController = require("../controller/orchidController");
const { ensureAuthenticated } = require("../config/auth");

router.route("/").get(ensureAuthenticated, orchidController.index);
router.route("/:id").get(orchidController.detail);

module.exports = router;
