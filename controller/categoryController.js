const passport = require("passport");
const bcrypt = require("bcrypt");
const Users = require("../model/user");
const Categories = require("../model/category");
class categoryController {
  index(req, res, next) {
    Categories.find({}).then((category) => {
      res.render("category/index", {
        title: "categories",
        categoriesData: category,
      });
      return;
    });
  }
  categoryDetail(req, res, next) {
    Categories.findById({ _id: req.params.id }).then((category) => {
      res.render("category/detail", {
        title: "category detail",
        categoryDetail: category,
      });
      return;
    });
  }
  updateCategory(req, res, next) {
    let updateData = {
      categoryName: req.body.categoryName.trim(),
    };
    if (updateData.categoryName === "") {
      req.flash("error_msg", "Category name can not blank!");
      res.redirect(`/categories/${req.params.id}`);
      return;
    }
    try {
      Categories.updateOne({ _id: req.params.id }, updateData).then((data) => {
        if (data.acknowledged) {
          req.flash("success_msg", "Update category successfully!");
          res.redirect(`/categories/${req.params.id}`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  deleteCategory(req, res, next) {
    Categories.deleteOne({ _id: req.params.id }).then((data) => {
      if (data.acknowledged) {
        req.flash("success_msg", "Delete category successfully!");
        res.redirect(`/categories`);
      }
    });
  }
}
module.exports = new categoryController();
