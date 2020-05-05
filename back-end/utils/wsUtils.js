const WebSocket = require("ws");

let connections = [];
let conversations = [];

const wsUtils = () => {
  const wsu = {};

  setInterval(() => {
    console.log("clients now *****");

    console.log(
      connections.map((c) => {
        return { s: c.socketId, state: c.state, active: c.active };
      })
    );

    console.log("conversations now *****");

    console.log(conversations);
  }, 6000);

  wsu.setWs = (server) => {
    const wss = new WebSocket.Server({ server });
    wss.on("connection", function connection(ws, req) {
      //el id de quien manda el mensaje
      const id = req.headers["sec-websocket-key"];

      ws.on("pong", function heartbeat() {
        connections.find((c) => c.socketId === id)["active"] = true;
      });

      console.log("new connection", id);

      setInterval(() => {
        connections.find((c) => c.socketId === id)["active"] = false;
        ws.ping(() => {});
      }, 1000);

      ws.on("message", function incoming(dataMessage) {
        console.log("received: ", dataMessage, Date.now());
        console.log(dataMessage);
        console.log("fin del console");
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

          //el server busca el destinatario (puede uno nuevo o puede ser con el que ya venia hablando)
          const receiver = connections.find((c) => {
            return (
              (c.state === 1 || jsonMessage.receiverId) &&
              c.active === true &&
              ((jsonMessage.receiverId &&
                c.socketId === jsonMessage.receiverId) ||
                (!jsonMessage.receiverId && c.socketId !== id))
            );
          });

          console.log("rec", receiver && receiver.socketId, "fin rec");

          if (receiver) {
            //le mando el mensaje a ese destinatario
            receiver.client.send(
              JSON.stringify({
                state: 0,
                senderId: id,
                receiverId: receiver.socketId,
                message: jsonMessage.message,
              })
            );
            receiver["state"] = 0;
          } else {
            //guardo el mensaje para esperar a que haya un client que me lo pueda recibir
            const myself = connections.find((c) => c.socketId === id);
            myself["lastMessage"] = jsonMessage.message;
          }
        }
        //el client manda un mensaje de configuración al servicio
        else if (jsonMessage.state === 1) {
          //mando corazón
          if (jsonMessage.heart === true) {
            let conversation = conversations.find((c) => {
              return c.user1 === id || c.user2 === id;
            });

            if (conversation) conversation["likes"] += 1;
          }
          console.log("Dieron click al corazón");
          console.log(jsonMessage);
        }
        //el client confirmo recepcion de mensaje
        else if (jsonMessage.state === 2) {
          console.log("llego al estado 2");
          conversations.push({
            user1: id,
            user2: jsonMessage.receiverId,
            likes: 0,
          });
          const receiver = connections.find(
            (c) => c.socketId === jsonMessage.receiverId
          );
          if (receiver) receiver.client.send(dataMessage);
        } else if (jsonMessage.state === 3) {
          console.log("llego al estado 3");
          connections = connections.filter(
            (c) => c.socketId !== jsonMessage.senderId
          );
        } else if (jsonMessage.state === 5) {
          const sender = connections.find((c) => c.state === 0);
          const receiver = connections.find((c) => c != sender);
          if (sender && receiver) {
            sender["state"] = 1;
            receiver["state"] = 1;
            console.log("le dieron dislike");
            ws.send(
              JSON.stringify({
                state: 5,
                message: "La conversación ha terminado",
                receiverId: receiver.socketId,
                senderId: sender.socketId,
              })
            );
            if (conversations) {
              conversations = [];
            }
            console.log("paila chat");
          }
        }
      });

      //al momento de la conexion si otro client estaba esperando se convierte en receiver
      const sleeper = connections.find(
        (c) =>
          c.state === 1 &&
          c.lastMessage !== undefined &&
          c.lastMessage !== null &&
          c.active === true
      );
      if (sleeper) {
        ws.send(
          JSON.stringify({
            state: 0,
            senderId: sleeper.socketId,
            receiverId: id,
            message: sleeper.lastMessage,
          })
        );
        sleeper["state"] = 0;
      }
      //el client se agrego a la pool
      connections.push({
        socketId: id,
        client: ws,
        state: sleeper ? 0 : 1,
        active: true,
      });
      console.log(
        "on push",
        !sleeper,
        connections.map((c) => {
          return { s: c.socketId, state: c.state };
        })
      );
    });

    wss.on("close", function close(rea) {
      console.log("closed", rea);
    });
  };
  return wsu;
};

module.exports = wsUtils();
