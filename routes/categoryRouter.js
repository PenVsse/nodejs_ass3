var express = require("express");
var router = express.Router();
const categoryController = require("../controller/categoryController");
const { ensureAuthenticated, adminAuthenticated } = require("../config/auth");

router.route("/").get(ensureAuthenticated, adminAuthenticated, categoryController.index);
router.route("/delete/:id").get(ensureAuthenticated, adminAuthenticated, categoryController.deleteCategory);
router
  .route("/:id")
  .get(ensureAuthenticated, adminAuthenticated, categoryController.categoryDetail)
  .put(ensureAuthenticated, adminAuthenticated, categoryController.updateCategory);

module.exports = router;
