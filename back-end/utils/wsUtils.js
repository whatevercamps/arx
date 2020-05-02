const WebSocket = require("ws");

let connections = [];

const wsUtils = () => {
  const wsu = {};

  setInterval(() => {
    console.log("clients now *****");

    console.log(
      connections.map((c) => {
        return { s: c.socketId, state: c.state, active: c.active };
      })
    );
  }, 6000);

  wsu.setWs = (server) => {
    const wss = new WebSocket.Server({ server });
    wss.on("connection", function connection(ws, req) {
      const id = req.headers["sec-websocket-key"];

      ws.on("pong", function heartbeat() {
        console.log("Pong from " + id);
        connections.find((c) => c.socketId === id)["active"] = true;
      });

      console.log("new connection", id);

      setInterval(() => {
        connections.find((c) => c.socketId === id)["active"] = false;
        ws.ping(() => {});
      }, 1000);

      ws.on("message", function incoming(dataMessage) {
        console.log("received: %s", dataMessage, Date.now());
        console.log(dataMessage);
        console.log("fin del console");
        const jsonMessage = JSON.parse(dataMessage);
        //el client mando un mensaje
        if (jsonMessage.state === 0) {
          console.log("llego al estado 0");

          ws.send(
            JSON.stringify({
              state: 1,
              message: "Your better half is waiting for your message",
            })
          );
          const receiver = connections.find((c) => {
            console.log("c", c.socketId, c.state);

            return c.state === 1 && c.socketId !== id && c.active === true;
          });

          console.log(
            "rec",
            receiver && receiver.socketId,
            connections.map((c) => c.socketId)
          );

          if (receiver) {
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
            const myself = connections.find((c) => c.socketId === id);
            myself["lastMessage"] = jsonMessage.message;
          }
        }
        //el client confirmo recepcion de mensaje
        else if (jsonMessage.state === 2) {
          console.log("llego al estado 2");
          const receiver = connections.find(
            (c) => c.socketId === jsonMessage.receiverId
          );
          if (receiver) receiver.client.send(dataMessage);
        } else if (jsonMessage.state === 3) {
          console.log("llego al estado 3");
          connections = connections.filter(
            (c) => c.socketId !== jsonMessage.senderId
          );
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
            senderId: sleeper,
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
