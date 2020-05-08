"use strict";

let express = require("express");
let router = express.Router();
let MongoUtils = require("../utils/mongoUtils");
const mu = MongoUtils();

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("respond with a resource");
});

router.post("/addMesagges", function (req, res) {
  mu.connect()
    .then((client) =>
      mu.addMessages(
        client,
        req.body.user1id,
        req.body.user2id,
        req.body.messages
      )
    )
    .then((resp) => {
      res.status(200).json({
        success: true,
        msg: "Messages added successfully",
        data: resp,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        msg: "Failure adding messages",
        error: err,
      });
    });
});

module.exports = router;
