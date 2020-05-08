"use strict";

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

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

  mu.updateUser = (client, userId, user) => {
    console.log("user", user);
    return handler(client)
      .findOneAndUpdate({ _id: new ObjectID(userId) }, { $set: user })
      .catch(function (e) {
        console.log("catch in model", e);
        throw e; //
      })
      .finally(() => {
        client.close();
      });
  };

  mu.addTastes = (client, userId, tastes) => {
    return handler(client)
      .findOneAndUpdate(
        { _id: new ObjectID(userId) },
        { $push: { tastes: { $each: tastes } } }
      )
      .catch(function (e) {
        console.log("catch in model", e);
        throw e; //
      })
      .finally(() => {
        client.close();
      });
  };

  mu.addUnconnections = (client, userId, unconnections) => {
    return handler(client)
      .findOneAndUpdate(
        { _id: new ObjectID(userId) },
        { $push: { unconnections: { $each: unconnections } } }
      )
      .catch(function (e) {
        console.log("catch in model", e);
        throw e; //
      })
      .finally(() => {
        client.close();
      });
  };

  mu.addComments = (client, userId, comments) => {
    return handler(client)
      .findOneAndUpdate(
        { _id: new ObjectID(userId) },
        { $push: { comments: { $each: comments } } }
      )
      .catch(function (e) {
        console.log("catch in model", e);
        throw e; //
      })
      .finally(() => {
        client.close();
      });
  };

  //
  // Conversation operations
  //

  mu.createConversation = (client, connection) => {
    console.log("creating conversation");

    return handler(client, "conversations")
      .insert(connection)
      .catch(function (e) {
        throw e; //
      })
      .finally(() => {
        console.log("conversation saved");

        client.close();
      });
  };

  mu.addMessages = (client, user1id, user2id, messages) => {
    return handler(client)
      .findOneAndUpdate(
        {
          $or: [
            { user1id: new ObjectID(user1id), user2id: new ObjectID(user2id) },
            { user2id: new ObjectID(user2id), user1id: new ObjectID(user1id) },
          ],
        },
        { $push: { messages: { $each: messages } } }
      )
      .catch(function (e) {
        console.log("catch in model", e);
        throw e; //
      })
      .finally(() => {
        client.close();
      });
  };

  return mu;
};

module.exports = MongoUtils;
