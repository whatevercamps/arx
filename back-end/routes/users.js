"use strict";

let express = require("express");
let router = express.Router();
let MongoUtils = require("../utils/mongoUtils");
const mu = MongoUtils();

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("respond with a resource");
});

router.post("/", function (req, res) {
  let user = {};
  user["name"] = req.body.name;
  user["phone"] = req.body.phone;
  user["email"] = req.body.email;
  user["info"] = req.body.info;
  user["tastes"] = req.body.tastes;
  user["lookingFor"] = req.body.lookingFor;
  user["unconnections"] = [];

  mu.connect()
    .then(mu.createClient)
    .then((resp) => {
      res.status(200).json({
        success: true,
        msg: "User created successfully",
        data: resp,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        msg: "Failure creating user",
        error: err,
      });
    });
});

module.exports = router;
