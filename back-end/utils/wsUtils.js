const WebSocket = require("ws");

let connections = [];

const wsUtils = () => {
  const wsu = {};

  wsu.setWs = (server) => {
    const wss = new WebSocket.Server({ server });
    wss.on("connection", function connection(ws, req) {
      const id = req.headers["sec-websocket-key"];
      console.log("new connection", id);
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

            return c.state === 1 && c.socketId !== id;
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
        }
      });

      //al momento de la conexion si otro client estaba esperando se convierte en receiver
      const sleeper = connections.find(
        (c) =>
          c.state === 1 && c.lastMessage !== undefined && c.lastMessage !== null
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
      }
      //el client se agrego a la pool
      connections.push({ socketId: id, client: ws, state: sleeper ? 0 : 1 });
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
