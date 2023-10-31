const passport = require("passport");
const bcrypt = require("bcrypt");
const Users = require("../model/user");
const Categories = require("../model/category");
const Orchids = require("../model/orchid");
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
    Orchids.find({ category: req.params.id }).then((data) => {
      if (data.length > 0) {
        req.flash("error_msg", "Can not delete this category. It exists in some orchids!");
        res.redirect(`/categories`);
        return;
      }
      Categories.deleteOne({ _id: req.params.id }).then((data) => {
        if (data.acknowledged) {
          req.flash("success_msg", "Delete category successfully!");
          res.redirect(`/categories`);
        }
      });
    });
  }
  createCategory(req, res, next) {
    if (req.body.categoryName.trim() === "") {
      req.flash("error_msg", "Category name can not blank!");
      res.redirect(`/categories`);
    }
    try {
      Categories.find({ categoryName: req.body.categoryName }).then((data) => {
        if (data.length > 0) {
          req.flash("error_msg", "Create new category failed. This category already exists!");
          res.redirect(`/categories`);
        } else {
          Categories.create(req.body).then((data) => {
            req.flash("success_msg", "Create new category successfully!");
            res.redirect(`/categories`);
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new categoryController();
