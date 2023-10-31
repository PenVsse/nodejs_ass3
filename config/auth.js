module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please log in first!");
    res.redirect("/user/login");
  },
  adminAuthenticated: function (req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
      return next();
    }
    req.flash("error_msg", "Only admin can do it!");
    res.redirect("/orchids");
  },
  userAuthenticated: function (req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin === false) {
      return next();
    }
    req.flash("error_msg", "Only user can do it!");
    res.redirect("/orchids");
  },
};
