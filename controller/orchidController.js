const Categories = require("../model/category");
const Comments = require("../model/comment");
const Orchid = require("../model/orchid");
const Users = require("../model/user");

class orchidController {
  index(req, res, next) {
    Orchid.find({})
      .populate("comments")
      .populate({ path: "category", select: "categoryName" })
      .then((data) => {
        res.render("orchid/index", {
          title: "Orchids",
          orchidsData: data,
        });
        return;
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
