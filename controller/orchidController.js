const Categories = require("../model/category");
const Comments = require("../model/comment");
const Orchid = require("../model/orchid");
const Users = require("../model/user");

class orchidController {
  index(req, res, next) {
    Categories.find({}).then((category) => {
      Orchid.find({})
        .populate({ path: "comments", populate: { path: "author" } })
        .populate("category")
        .sort({ updatedAt: -1 })
        .then((data) => {
          res.render("orchid/index", {
            title: "Orchids",
            orchidsData: data,
            categoryData: category,
          });
          return;
        });
    });
  }
  createOrchid(req, res, next) {
    let newData = {
      name: req.body.name.trim(),
      origin: req.body.origin.trim(),
      image: req.body.image.trim(),
      isNatural: req.body.isNatural ? true : false,
      category: req.body.category,
    };

    if (!newData.name.trim()) {
      req.flash("error_msg", "Create failed. Orchid name can not blank!");
      res.redirect(`/orchids`);
      return;
    }

    if (!newData.origin.trim()) {
      req.flash("error_msg", "Create failed. Origin can not blank!");
      res.redirect(`/orchids`);
      return;
    }

    if (!newData.image.trim()) {
      req.flash("error_msg", "Create failed. Image url can not blank!");
      res.redirect(`/orchids`);
      return;
    }

    if (!req.body.category) {
      req.flash("error_msg", "Create failed. Category can not blank!");
      res.redirect(`/orchids`);
      return;
    }

    const orchid = new Orchid(newData);
    orchid
      .save()
      .then((data) => {
        console.log(data);
        req.flash("success_msg", "Add new orchid successfully!");
        res.redirect("/orchids");
      })
      .catch((error) => {});
  }
  deleteOrchid(req, res, next) {
    Orchid.deleteOne({ _id: req.params.id }).then((data) => {
      if (data.acknowledged) {
        req.flash("success_msg", "Delete orchid successfully!");
        res.redirect("/orchids");
      }
    });
  }
  updateOrchid(req, res, next) {
    let updateData = {
      name: req.body.name.trim(),
      origin: req.body.origin.trim(),
      image: req.body.image.trim(),
      isNatural: req.body.isNatural ? true : false,
      category: req.body.category,
    };

    if (!updateData.name.trim()) {
      req.flash("error_msg", "Update failed. Orchid name can not blank!");
      res.redirect(`/orchids/${req.params.id}`);
      return;
    }

    if (!updateData.origin.trim()) {
      req.flash("error_msg", "Update failed. Origin can not blank!");
      res.redirect(`/orchids/${req.params.id}`);
      return;
    }

    if (!updateData.image.trim()) {
      req.flash("error_msg", "Update failed. Image url can not blank!");
      res.redirect(`/orchids/${req.params.id}`);
      return;
    }

    Orchid.updateOne({ _id: req.params.id }, updateData).then((data) => {
      if (data.acknowledged) {
        req.flash("success_msg", "Update orchid successfully!");
        res.redirect(`/orchids/${req.params.id}`);
      }
    });
  }
  detail(req, res, next) {
    try {
      Categories.find({}).then((category) => {
        Orchid.findById({ _id: req.params.id })
          .populate({ path: "comments", populate: { path: "author" } })
          .populate("category")
          .then((data) => {
            console.log(data);
            res.render("orchid/detail", {
              title: "Detail of orchid",
              orchidDetail: data,
              categoryData: category,
            });
          })
          .catch((err) => {
            res.json("Invalid");
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  addComment(req, res, next) {
    try {
      let newComment = {
        author: req.body.author,
        comment: req.body.comment,
        rating: Number(req.body.rating),
      };
      Comments.create(newComment).then((comment) => {
        Orchid.findByIdAndUpdate(req.params.id, { $push: { comments: comment._id } }, { new: true }, (err, updated) => {
          if (err) {
            console.error(err);
          } else {
            req.flash("success_msg", "Comment orchid successfully!");
            res.redirect(`/orchids/${req.params.id}`);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new orchidController();
