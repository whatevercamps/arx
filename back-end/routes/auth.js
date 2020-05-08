var express = require("express");
var router = express.Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
/* GET home page. */

router.get("/login/success", (req, res) => {
  console.log("success? ", req.user);
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "user failed to authenticate.",
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    successRedirect: CLIENT_HOME_PAGE_URL,
  }),
  function (req, res) {
    console.log("profile after auth", req.user);
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

module.exports = router;
