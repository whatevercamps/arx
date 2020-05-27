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

  mu.getUsersByEmail = (client, email) => {
    let query = { email: email };
    console.log("query", query);

    return handler(client)
      .find(query)
      .toArray()
      .catch(function (e) {
        console.log("catch in model", e);
        throw e; //
      })
      .finally(() => {
        console.log("finalizing get user by email");
        client.close();
      });
  };

  mu.getUsers = (client, userid) => {
    let query = { _id: new ObjectID(userid) };

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

  mu.findOrCreateUser = (client, query, doc) => {
    return handler(client)
      .findOneAndUpdate(
        query,
        {
          $setOnInsert: doc || query,
        },
        {
          upsert: true, // insert the document if it does not exist
          new: true, // return new doc if one is upserted
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
      .updateOne(user, { $setOnInsert: user }, { upsert: true })
      .catch(function (e) {
        throw e; //
      })
      .finally(() => {
        client.close();
      });
  };

  mu.updateUser = (client, userId, user) => {
    console.log("user update in mongo utils", userId, user);
    return handler(client)
      .findOneAndUpdate(
        { _id: ObjectID(userId) },
        { $set: user },
        { returnOriginal: false }
      )
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
  // Conversation functions
  //

  mu.getConversations = (client, userid) => {
    const query = {
      $or: [{ user1dbId: userid }, { user2dbId: userid }],
    };
    return handler(client, "conversations")
      .find(query)
      .toArray()
      .catch(function (e) {
        throw e; //
      })
      .finally(() => {
        client.close();
      });
  };

  mu.getConversation = (client, query) => {
    return handler(client, "conversations")
      .find(query)
      .toArray()
      .catch(function (e) {
        throw e; //
      })
      .finally(() => {
        client.close();
      });
  };

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

  mu.listenForChanges = (client, notifyAll) => {
    console.log("listening for changes");

    const cursor = handler(client, "conversations").watch();

    cursor.on("change", (conversation) => {
      console.log("change", conversation);

      mu.connect()
        .then((client2) =>
          mu.getConversation(client2, conversation.documentKey)
        )
        .then((conversations) => {
          console.log("conversacion cambiada", conversation);

          if (
            conversations &&
            conversations.length &&
            conversations[0].user1dbId &&
            conversations[0].user2dbId
          )
            notifyAll(
              [conversations[0].user1dbId, conversations[0].user2dbId],
              conversations[0]
            );
        });
    });
  };

  mu.addMessages = (client, user1id, user2id, messages) => {
    const query = {
      $or: [
        { user1dbId: user1id, user2dbId: user2id },
        { user1dbId: user2id, user2dbId: user1id },
      ],
    };
    const update = { $push: { messages: { $each: messages } } };
    console.debug("query", JSON.stringify(query));
    console.debug("update", JSON.stringify(update));
    return handler(client, "conversations")
      .findOneAndUpdate(query, update)
      .catch(function (e) {
        console.log("catch in model", e);
        throw e; //
      })
      .finally(() => {
        client.close();
      });
  };

  mu.createUnconnection = (client, user1id, user2id) => {
    console.log(`params for saving in ${user1id}`, user1id, user2id);

    const query = { _id: new ObjectID(user1id) };
    const update = { $push: { unconnections: user2id } };
    console.debug("query", JSON.stringify(query));
    console.debug("update", JSON.stringify(update));
    return (
      handler(client)
        .findOneAndUpdate(query, update)
        // .find(query)
        // .toArray()
        .catch(function (e) {
          console.log("catch in model", e);
          throw e; //
        })
        .finally(() => {
          client.close();
        })
    );
  };

  mu.canItalk = (client, user1id, user2id) => {
    console.log("params for canItalk", user1id, user2id);
    const query = {
      $and: [
        { _id: new ObjectID(user1id) },
        { unconnections: { $ne: user2id } },
      ],
    };

    return handler(client).find(query).toArray();
  };

  return mu;
};

module.exports = MongoUtils;
