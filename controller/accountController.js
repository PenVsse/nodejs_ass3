const passport = require("passport");
const bcrypt = require("bcrypt");
const Users = require("../model/user");
class accountController {
  index(req, res, next) {
    Users.find({}).then((data) => {
      res.render("admin/userManage", {
        title: "userManage",
        usersData: data,
      });
    });
  }
}
module.exports = new accountController();
