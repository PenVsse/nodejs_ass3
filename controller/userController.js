const passport = require("passport");
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
}
module.exports = new userController();
