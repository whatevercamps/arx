var express = require("express");
var router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const CLIENT_HOME_PAGE_URL = "/"; //jkasdjkadkjakjdkjakjda
/* GET home page. */
const mu = require("../utils/mongoUtils")();

router.get("/login/success", (req, res) => {
  console.log("success? ", req.user, req.isAuthenticated());
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
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
  console.log("logout intent");

  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL); //jkasdjkadkjakjdkjakjda
});
router.post("/local/login", passport.authenticate("local"), function (
  req,
  res
) {
  console.log("user in login route", req.user);

  if (req.user) {
    res.json({ success: true, user: req.user });
  } else {
    res.status(401).json({ success: false });
  }
});

router.get("/local/login", (req, res, next) => {
  const form =
    '<h1>Login Page</h1><form method="POST" action="/auth/login">\
  Enter Username:<br><input type="text" name="username">\
  <br>Enter Password:<br><input type="password" name="password">\
  <br><br><input type="submit" value="Submit"></form>';
  res.send(form);
});

router.post("/createUserWithEmail", (req, res) => {
  let newUser = {
    email: req.body.email,
    password: req.body.password,
  };

  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(newUser.password, salt))
    .then((hash) => {
      newUser.password = hash;
      return mu
        .connect()
        .then((client) =>
          mu.findOrCreateUser(client, { email: req.body.email }, newUser)
        )
        .then((resp) => {
          res.status(200).json({
            success: true,
            msg: "User registered",
            data: resp,
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        msg: "Failure registering user",
        error: err,
      });
    });
});

router.post("/getTokenWithEmail", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  mu.connect()
    .then((client) => mu.getUsersByEmail(client, email))
    .then((users) => {
      console.log("usuarios encontrados", users);

      if (!users || !users.length) {
        return res.status(401).json({
          success: false,
          msg: "Email or password wrong",
        });
      }

      bcrypt
        .compare(password, users[0].password)
        .then((isMatch) => {
          if (isMatch) {
            const expiresTime = 60 * 60;
            const token = jwt.sign(
              users[0],
              process.env.COOKIE_SESSION_SECRET,
              {
                expiresIn: expiresTime,
              }
            );
            if (req.query["json"] && req.query["json"] == "true")
              return res.status(200).json({
                success: true,
                msg: "Your token expires in 1 hour",
                token: token,
              });
            res.cookie("session", token, { httpOnly: true, secure: false });
            return res.status(200).json({ success: true });
          } else {
            return res.json({
              success: false,
              msg: "Email or password wrong",
            });
          }
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(500).json({
            success: false,
            msg: "error validating credentials",
            error: err,
          });
        });
    })
    .catch((err) => {
      console.log("error", err);
      return res
        .status(500)
        .json({ success: false, msg: "error in user auth", error: err });
    });
});

//
//JWT Strategy
//

router.get(
  "/emailValidate",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    let user = req.user;
    console.log("user from token, ", user);
    if (user) delete user["password"];
    res.status(200).json({
      success: true,
      user: ((user["password"] = "*"), user),
    });
  }
);

//
//Facebook Strategie
//

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/signin",
    successRedirect: CLIENT_HOME_PAGE_URL, //jkasdjkadkjakjdkjakjda
  }),
  function (req, res) {
    console.log("profile after auth", req.user);
    // Successful authentication, redirect home.
    res.redirect("/"); //jkasdjkadkjakjdkjakjda
  }
);

module.exports = router;
