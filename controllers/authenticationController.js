exports.isAuth = (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    return next();
  } else {
    return res.redirect("/");
  }
};
