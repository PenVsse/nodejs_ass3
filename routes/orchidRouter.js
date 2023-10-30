var express = require("express");
var router = express.Router();
const orchidController = require("../controller/orchidController");

router.route("/").get(orchidController.index);
router.route("/:id").get(orchidController.detail);

module.exports = router;
