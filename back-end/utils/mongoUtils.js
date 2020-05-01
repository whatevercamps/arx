"use strict";

const MongoClient = require("mongodb").MongoClient;
// const ObjectID = require("mongodb").ObjectID;

const MongoUtils = () => {
  const mu = {};

  const dbURL = process.env.DB_URL || "I didn't read the deploy instructions";
  const dbName = process.env.DB_NAME || "I didn't read the deploy instructions";

  const collection = "users";

  const handler = (client, pColl) =>
    client.db(dbName).collection(pColl || collection);

  mu.connect = () => {
    const client = new MongoClient(dbURL, { useNewUrlParser: true });
    return client.connect().catch(function (e) {
      console.log("current dburl", dbURL);
      console.log("catch in connect", e);
      throw e;
    });
  };

  //
  // USER FUNCTIONS
  //

  mu.getUsers = (client) => {
    let query = {};

    return handler(client)
      .find(query)
      .toArray()
      .catch(function (e) {
        console.log("catch in model", e);
        throw e; //
      })
      .finally(() => {
        client.close();
      });
  };

  mu.findOrCreateUser = (client, query) => {
    return handler(client)
      .findOneAndUpdate(
        query,
        {
          $setOnInsert: query,
        },
        {
          new: true, // return new doc if one is upserted
          upsert: true, // insert the document if it does not exist
        }
      )
      .catch(function (e) {
        console.log("catch in model", e);
        throw e; //
      })
      .finally(() => {
        client.close();
      });
  };

  mu.createUser = (client, user) => {
    return handler(client)
      .insert(user)
      .catch(function (e) {
        throw e; //
      })
      .finally(() => {
        client.close();
      });
  };

  return mu;
};

module.exports = MongoUtils;
