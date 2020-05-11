"use strict";

let express = require("express");
let router = express.Router();
let MongoUtils = require("../utils/mongoUtils");
const mu = MongoUtils();

/* GET users listing. */
router.get("/", function (req, res) {
  mu.connect().then((client) =>
    mu
      .getConversations(client, req.query.userid || "another fake id")
      .then((conversations) => {
        console.log("got conversations", conversations);
        res.status(200).json({ success: true, conversations: conversations });
      })
      .catch((err) => res.status(500).json({ success: false, error: err }))
  );
});

router.post("/addMessages", function (req, res) {
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
      console.log("resp", resp);
      res.status(200).json({
        success: true,
        msg: "Messages added successfully",
        data: resp,
      });
    })
    .catch((err) => {
      console.log("error", err);
      return res.status(500).json({
        success: false,
        msg: "Failure adding messages",
        error: err,
      });
    });
});

module.exports = router;
