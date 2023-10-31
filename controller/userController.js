const passport = require("passport");
const bcrypt = require("bcrypt");
const Users = require("../model/user");
class userController {
  getLoginPage(req, res, next) {
    res.render("login/index", {
      title: "Login",
    });
  }

  loginAccount(req, res, next) {
    // passport.authenticate("local", {
    //   successRedirect: "/orchids",
    //   failureRedirect: "/user/login",
    // })(req, res, next);
    passport.authenticate("local", (err, user, info) => {
      if (!user) {
        req.flash(Object.keys(info), Object.values(info));
        res.redirect("/user/login");
        return;
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        req.flash(Object.keys(info), Object.values(info));
        return res.redirect("/orchids");
      });
    })(req, res, next);
  }

  logoutAcount(req, res, next) {
    req.logout(() => {
      req.flash("success_msg", "You are logged out!");
      res.redirect("/orchids");
    });
  }

  getRegisterPage(req, res, next) {
    res.render("register/index", {
      title: "Register",
    });
  }

  async createAccount(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash("error_msg", "Please enter all fields!");
      res.redirect("/user/register");
      return;
    }
    const patternUsername = /^(?!^\s$)[^\s]{1,12}$/;
    const patternPassword = /^(?!^\s$)[^\s]{6,12}$/;
    const isValidUsername = patternUsername.test(username);
    const isValidPassword = patternPassword.test(password);
    if (!isValidUsername) {
      req.flash("error_msg", "Please enter between 1 and 12 characters and do not contain spaces!");
      res.redirect("/user/register");
      return;
    }
    if (!isValidPassword) {
      req.flash("error_msg", "Please enter between 6 and 12 characters and do not contain spaces!");
      res.redirect("/user/register");
      return;
    }

    const account = await Users.findOne({ username: username });
    if (account) {
      req.flash("error_msg", "Account already exists!");
      res.redirect("/user/register");
      return;
    }
    bcrypt.hash(password, 10, async function (err, hash) {
      await Users.create({
        username,
        password: hash,
        name: req.body.name,
        YOB: Number(req.body.YOB),
      });
      req.flash("success_msg", "Create account successfully!");
      res.redirect("/user/login");
      return;
    });
  }

  accountInfo(req, res, next) {
    Users.find({ _id: req.params.id }).then((data) => {
      res.render("userInfo/index", {
        title: "userInfo",
        userInfo: data,
      });
    });
  }

  async updateAccountInfo(req, res, next) {
    try {
      if (req.body.password && req.body.password.trim() !== "") {
        bcrypt.hash(req.body.password, 10, async function (err, hash) {
          let dataUpdate = {
            password: hash,
            name: req.body.name,
            YOB: Number(req.body.YOB),
          };
          await Users.updateOne({ _id: req.params.id }, dataUpdate);
          req.flash("success_msg", "Update account info successfully!");
          res.redirect(`/user/${req.params.id}`);
          return;
        });
      } else {
        let dataUpdate = {
          name: req.body.name,
          YOB: Number(req.body.YOB),
        };
        await Users.updateOne({ _id: req.params.id }, dataUpdate);
        req.flash("success_msg", "Update account info successfully!");
        res.redirect(`/user/${req.params.id}`);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
  getUsers(req, res, next) {
    Users.find({}).then((data) => {
      res.render("admin/userManage", {
        title: "userManage",
        usersData: data,
      });
    });
  }
}
module.exports = new userController();
