var express = require("express");
var router = express.Router();
const orchidController = require("../controller/orchidController");
const { ensureAuthenticated, adminAuthenticated, userAuthenticated } = require("../config/auth");

router.route("/comment/:id").post(ensureAuthenticated, userAuthenticated, orchidController.addComment);
router
  .route("/:id")
  .get(orchidController.detail)
  .delete(ensureAuthenticated, adminAuthenticated, orchidController.deleteOrchid)
  .put(ensureAuthenticated, adminAuthenticated, orchidController.updateOrchid);
router.route("/").get(orchidController.index).post(adminAuthenticated, orchidController.createOrchid);

module.exports = router;
