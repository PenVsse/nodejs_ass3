const Categories = require("../model/category");
const Comments = require("../model/comment");
const Orchid = require("../model/orchid");
const Users = require("../model/user");

class orchidController {
  index(req, res, next) {
    Categories.find({}).then((category) => {
      Orchid.find({})
        .populate("comments")
        .populate({ path: "category", select: "categoryName" })
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
      name: req.body.name,
      origin: req.body.origin,
      image: req.body.image,
      isNatural: req.body.isNatural ? true : false,
      category: req.body.category,
    };
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
    console.log("123");
    Orchid.deleteOne({ _id: req.params.id }).then((data) => {
      console.log(data);
      if (data.acknowledged) {
        return;
      }
    });
  }
  detail(req, res, next) {
    const id = req.params.id;
    Orchid.findById(id)
      .populate("comments")
      .populate({ path: "category", select: "categoryName" })
      .then((data) => {
        res.render("orchid/detail", {
          title: "Detail of orchid",
          orchidDetail: data,
        });
      });
  }
}
module.exports = new orchidController();
