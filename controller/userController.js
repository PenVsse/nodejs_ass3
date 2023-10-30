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
    passport.authenticate("local", {
      successRedirect: "/orchids",
      failureRedirect: "/user/login",
    })(req, res, next);
  }
  getRegisterPage(req, res, next) {
    res.render("register/index", {
      title: "Register",
    });
  }
  async createAccount(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash("error_msg", "Please enter all fields");
      res.redirect("/user/register");
      return;
    }
    const patternUsername = /^(?!^\s$)[^\s]{1,12}$/;
    const patternPassword = /^(?!^\s$)[^\s]{6,12}$/;
    const isValidUsername = patternUsername.test(username);
    const isValidPassword = patternPassword.test(password);
    if (!isValidUsername) {
      req.flash("error_msg", "Please enter between 1 and 12 characters and do not contain spaces");
      res.redirect("/user/register");
      return;
    }
    if (!isValidPassword) {
      req.flash("error_msg", "Please enter between 6 and 12 characters and do not contain spaces");
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
      });
      req.flash("success_msg", "Create account successfully!");
      res.redirect("/user/login");
      return;
    });
  }
}
module.exports = new userController();
