import React, { useState, useEffect } from "react";
// import Home from "./Home";
import Home from "./Home";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
const socket = new WebSocket("ws://localhost:3001");

function App() {
  const [user, setUser] = useState({ facebookId: "1170177643325233" });
  const [header, setHeader] = useState(
    "Welcome to Arx, start chatting and meeting new people!"
  );
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState();

  const [messageC, setMessageC] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        console.log("holu socket conectado");
        socket.onerror = function (event) {
          console.error("WebSocket error observed", event);
        };
      };
      socket.onmessage = (inMsg) => {
        setMessageC((d) => d + 1);
        const data = JSON.parse(inMsg.data);
        if (data.state === 0) {
          setMessages((d) => {
            d.push(data);
            return [...new Set(d)];
          });
          if (socket) {
            socket.send(
              JSON.stringify({
                state: 2,
                senderId: data.receiverId,
                receiverId: data.senderId,
                message: data.message,
              })
            );
            const c = {
              betterHalf: data.senderId,
            };
            if (!chat) setChat(c);
          } else {
            console.log("socket not found ");
          }
        } else if (data.state === 1) {
          console.log("mesg 1", inMsg);
          setHeader(data.message);
        } else if (data.state === 2) {
          console.log("mesg 2", inMsg);
          const c = {
            betterHalf: data.senderId,
            mySocketId: data.receiverId,
          };
          if (!chat) setChat(c);
        }
      };
    } else {
      console.log("no hay socket");
    }

    return () => {
      if (socket && chat && chat.mySocketId) {
        let payload = { state: 4, message: "I'm leaving" };
        if (chat && chat.betterHalf) payload["receiverId"] = chat.betterHalf;
        if (chat && chat.mySocketId) payload["senderId"] = chat.mySocketId;
        socket.send(JSON.stringify(payload));
      } else {
        debugger;
      }
    };
  }, []);

  const sendMessage = (msg) => {
    if (socket) {
      let payload = { state: 0, message: msg };
      if (chat && chat.betterHalf) payload["receiverId"] = chat.betterHalf;
      if (chat && chat.mySocketId) payload["senderId"] = chat.mySocketId;

      socket.send(JSON.stringify(payload));
      setMessages(
        (d) => (
          d.push({ isMine: true, message: msg, time: Date.now() }),
          [...new Set(d)]
        )
      );
      console.log("mesg mandado", JSON.stringify(payload));
    } else {
      console.log("socket not found");
    }
  };
  return (
    <div className='App'>
      <Navbar />
      {!chat ? (
        <Home header={header} initChatIntent={sendMessage} />
      ) : (
        <Chat
          chat={chat}
          socket={socket}
          messages={messages}
          sendMessage={sendMessage}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
