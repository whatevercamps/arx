var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");

const passportMiddleware = require("./utils/passport");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use(passport.session());
passportMiddleware(passport);

app.set("superSecret", process.env.SECRET || "youreismysecretbaby");

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
