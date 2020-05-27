const WebSocket = require("ws");
const mu = require("./mongoUtils")();

let connections = [];
let conversations = [];

const MAX_TIME = 20 * 60 * 1000;

const endConversation = (
  user1id,
  user2id,
  conversationToSave,
  conversationToKill
) => {
  console.log("terminando clientes", user1id, user2id);

  const sender = connections.find(
    (c) => c.state === 0 && c.socketId === user1id
  );
  const receiver = connections.find(
    (c) => c.state === 0 && c.socketId === user2id
  );
  if (sender && receiver) {
    sender["state"] = 1;
    receiver["state"] = 1;

    sender.client.send(
      JSON.stringify({
        state: 5,
        timeLeft: "its_gone",
        message: "La conversación ha terminado",
      })
    );

    receiver.client &&
      receiver.client.send(
        JSON.stringify({
          state: 5,
          timeLeft: "its_gone",
          message: "La conversación ha terminado",
        })
      );
    if (conversationToSave) {
      mu.connect()
        .then((client) => {
          conversationToSave["messages"] = [];
          return mu.createConversation(client, conversationToSave);
        })
        .catch((err) => {
          console.log("error saving conversation", err);
        });
    } else {
      if (conversationToKill.user1DbId && conversationToKill.user2DbId) {
        mu.connect()
          .then((client) => {
            return mu.createUnconnection(
              client,
              conversationToKill.user1DbId,
              conversationToKill.user2DbId
            );
          })
          .then((resp) => {
            console.log("resp unn ---->", resp);
          })
          .catch((err) => {
            console.log(
              "error saving unconnection ",
              conversationToKill.user1DbId,
              err
            );
          });

        mu.connect()
          .then((client) => {
            return mu.createUnconnection(
              client,
              conversationToKill.user2DbId,
              conversationToKill.user1DbId
            );
          })
          .then((resp) => {
            console.log("resp unn ---->", resp);
          })
          .catch((err) => {
            console.log(
              "error saving unconnection",
              conversationToKill.user2DbId,
              err
            );
          });
      } else {
        console.log("the conversation has no users db ids");
      }
    }

    conversations = conversations.filter(
      (c) =>
        c.user1 !== sender.socketId &&
        c.user2 !== receiver.socketId &&
        c.user2 !== sender.socketId &&
        c.user1 !== receiver.socketId
    );
    console.log("paila chat");
  }
};

const wsUtils = () => {
  const wsu = {};

  // setInterval(() => {
  //   console.log("now ***** ", Date.now());
  //   console.log("clients");

  //   console.log(
  //     connections.map((c) => {
  //       let cc = { ...c };
  //       cc["client"] = "***";
  //       return cc;
  //     })
  //   );
  //   console.log("conversations");
  //   console.log(conversations);
  // }, 15000);

  wsu.notify = (userid, data) => {
    const conn = connections.find(
      (c) => c.dbId === userid && c.active === true
    );
    console.log("client a notificar ", userid, conn && conn.socketId);

    if (conn) conn.client.send(JSON.stringify({ state: 6, data: data }));
    else console.log("no se pudo notificar", userid);
  };

  wsu.notifyAll = (users_ids, data) => {
    console.log("usuarios a notificar", users_ids);

    const conns = connections.filter((c) => {
      const is = c.active === true && users_ids.find((uid) => uid === c.dbId);
      console.log("con ana***", c, is);
      return is;
    });

    console.log("connections encontradas", conns);
    conns.forEach((conn) => {
      console.log("client a notificar ", conn && conn.socketId);
      conn.client.send(JSON.stringify({ state: 6, data: data }));
    });
  };

  wsu.setWs = (server) => {
    const wss = new WebSocket.Server({ server });
    wss.on("connection", function connection(ws, req) {
      //el id de quien manda el mensaje
      const id = req.headers["sec-websocket-key"];

      //ws.send(JSON.stringify({ state: 4, message: "i need your db id" }));

      ws.on("pong", function heartbeat() {
        const conn = connections.find((c) => c.socketId === id);
        if (conn) conn["active"] = true;

        const conversation = conversations.find(
          (c) => c.user1 === id || c.user2 === id
        );

        if (conversation) {
          let millsLeft = Math.max(
            -5000,
            conversation.startTime + MAX_TIME - Date.now()
          );
          const payload = {
            state: 5,
            timeLeft: millsLeft,
          };
          ws.send(JSON.stringify(payload));
          if (millsLeft <= 0) {
            // console.log("etapa de terminacion", millsLeft);
            const killedId =
              conversation.user1 === id
                ? conversation.user2
                : conversation.user1;
            if (conversation.likes.size >= 2) {
              console.log("termina con Match: ", millsLeft);
              endConversation(id, killedId, conversation, false);
            } else if (millsLeft <= -5000) {
              console.log("termina forzado: ", millsLeft);
              endConversation(id, killedId, false, conversation);
            }
          }
        }
      });

      console.log("new connection", id);

      setInterval(() => {
        const conn = connections.find((c) => c.socketId === id);
        if (conn) conn["active"] = false;
        ws.ping(() => {});
      }, 1000);

      ws.on("message", function incoming(dataMessage) {
        console.log("received: ", dataMessage, Date.now());
        console.log(dataMessage);
        console.log("fin del console ");
        //jsonmessage es el mensaje convertido a json
        const jsonMessage = JSON.parse(dataMessage);

        //el client mandó un mensaje para otro client
        if (jsonMessage.state === 0) {
          console.log("llego al estado 0");

          //manda un mensaje de confirmación al client que mando el mensaje de estado 0
          ws.send(
            JSON.stringify({
              state: 1,
              message: "Your better half is waiting for your message",
            })
          );

          const sender = connections.find((c) => c.socketId === id);

          //el server busca el destinatario (puede ser uno nuevo o puede ser con el que ya venia hablando)
          const receiver = connections.find((c) => {
            return (
              (c.state === 1 || jsonMessage.receiverId) &&
              c.active === true &&
              ((jsonMessage.receiverId &&
                c.socketId === jsonMessage.receiverId) ||
                (!jsonMessage.receiverId && c.socketId !== id)) &&
              c.userInfo &&
              (!c.userInfo.unconnections ||
                !c.userInfo.unconnections.length ||
                !c.userInfo.unconnections.includes(sender.dbId)) &&
              //que tenga el lookin for
              sender.userInfo.lkfAgeMax >= c.userInfo.age &&
              sender.userInfo.lkfAgeMin <= c.userInfo.age &&
              sender.userInfo.lkfGender.includes(c.userInfo.gender) &&
              // que yo sea parte de su lookin for
              c.userInfo.lkfAgeMax >= sender.userInfo.age &&
              c.userInfo.lkfAgeMin <= sender.userInfo.age &&
              c.userInfo.lkfGender.includes(sender.userInfo.gender)
            );
          });

          console.debug("rec", receiver && receiver.userInfo, "fin rec");
          console.debug("sender", sender && sender.userInfo, "fin sender");

          if (receiver && sender) {
            //le mando el mensaje a ese destinatario
            receiver.client.send(
              JSON.stringify({
                state: 0,
                senderId: id,
                receiverId: receiver.socketId,
                message: jsonMessage.message,
                senderName: sender.userInfo.name,
              })
            );
            receiver["state"] = 0;
          } else if (sender) {
            sender["lastMessage"] = jsonMessage.message;
          }
        }
        //el client manda un mensaje de configuración al servicio
        else if (jsonMessage.state === 1) {
          //mando corazón
          if (jsonMessage.heart === true) {
            let conversation = conversations.find((c) => {
              return c.user1 === id || c.user2 === id;
            });

            if (conversation) {
              conversation["likes"].add(id);
              const indexName =
                conversation.user1 === id
                  ? ["user1dbId", "user1name"]
                  : ["user2dbId", "user2name"];
              conversation[indexName[0]] = jsonMessage.dbId;
              conversation[indexName[1]] = jsonMessage.userName;
            }
          }
          console.log("Dieron click al corazón");
          console.log(jsonMessage);
        }
        //el client confirmo recepcion de mensaje
        else if (jsonMessage.state === 2) {
          console.log("llego al estado 2");
          const receiver = connections.find(
            (c) => c.socketId === jsonMessage.receiverId && c.active === true
          );
          const sender = connections.find(
            (c) => c.socketId === id && c.active === true
          );
          if (receiver && receiver.dbId && sender && sender.dbId) {
            conversations.push({
              user1DbId: sender.dbId,
              user2DbId: receiver.dbId,
              user1: id,
              user2: jsonMessage.receiverId,
              likes: new Set([]),
              startTime: Date.now(),
            });
            receiver.client.send(
              JSON.stringify({
                ...jsonMessage,
                senderName: sender.userInfo.name,
              })
            );
            receiver.state = 0;
          } else {
            console.log("the other user is gone");
          }
        } else if (jsonMessage.state === 3) {
          console.log("llego al estado 3");
          connections = connections.filter(
            (c) => c.socketId !== jsonMessage.senderId
          );
        } else if (jsonMessage.state === 4) {
          //el client se agrego a la pool
          mu.connect()
            .then((client) => mu.getUsers(client, jsonMessage.message))
            .then((resp) => {
              console.log("user found in db", resp);

              if (resp && resp.length) {
                connections.push({
                  socketId: id,
                  client: ws,
                  state: 1,
                  active: true,
                  dbId: jsonMessage.message,
                  userInfo: resp[0],
                });
                console.log(
                  "on push",
                  connections.map((c) => {
                    return { s: c.socketId, state: c.state };
                  })
                );

                //al momento de la conexion si otro client estaba esperando se convierte en receiver
                const sleeper = connections.find(
                  (c) =>
                    c.state === 1 &&
                    c.lastMessage !== undefined &&
                    c.lastMessage !== null &&
                    c.active === true &&
                    //que no sea un bloqueado papuh
                    c.userInfo &&
                    (!c.userInfo.unconnections ||
                      !c.userInfo.length ||
                      !c.userInfo.unconnections.includes(
                        jsonMessage.message
                      )) &&
                    //que tenga el lookin for
                    resp.lkfAgeMax >= c.age &&
                    resp.lkfAgeMin <= c.age &&
                    resp.lkfGender.includes(c.gender) &&
                    // que yo sea parte de su lookin for
                    c.lkfAgeMax >= resp.age &&
                    c.lkfAgeMin <= resp.age &&
                    c.lkfGender.includes(resp.gender)
                );

                const sender = connections.find(
                  (c) =>
                    c.active === true &&
                    c.socketId === id &&
                    c.userInfo &&
                    sleeper &&
                    (!c.userInfo.unconnections ||
                      !c.userInfo.unconnections.length ||
                      !c.userInfo.unconnections.includes(sleeper.dbId))
                );

                console.log(
                  "sleeper y sender encontrados? ",
                  sleeper && sleeper.socketId,
                  sender && sender.socketId
                );

                if (sleeper && sender) {
                  ws.send(
                    JSON.stringify({
                      state: 0,
                      senderId: sleeper.socketId,
                      receiverId: id,
                      message: sleeper.lastMessage,
                    })
                  );
                  sender["state"] = 0;
                  sleeper["state"] = 0;
                }
              }
            });
        } else if (jsonMessage.state === 5) {
          const conversation = conversations.find(
            (c) => c.user1 === id || c.user2 === id
          );
          if (conversation)
            endConversation(id, jsonMessage.receiverId, false, conversation);
        }
      });
    });

    wss.on("close", function close(rea) {
      console.log("closed", rea);
    });
  };
  return wsu;
};

module.exports = wsUtils();
