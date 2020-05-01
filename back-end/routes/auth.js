var express = require("express");
var router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res) {
  res.redirect("/");
});

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    console.log("profile", req.user);
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

module.exports = router;
