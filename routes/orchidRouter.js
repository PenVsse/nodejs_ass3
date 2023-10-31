var express = require("express");
var router = express.Router();
const orchidController = require("../controller/orchidController");
const { ensureAuthenticated, adminAuthenticated } = require("../config/auth");
router.route("/:id").get(orchidController.detail).delete(adminAuthenticated, orchidController.deleteOrchid);

router.route("/").get(orchidController.index).post(adminAuthenticated, orchidController.createOrchid);

module.exports = router;
