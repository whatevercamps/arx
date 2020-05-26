import React, { useState, useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import Register from "./components/Register/Register";
import RegisterInit from "./components/Register/RegisterInit";
import Matches from "./components/Matches";
import Profile from "./components/Profile";
import "./App.css";
const socketURL = window.location.origin
  .replace(/^http/, "ws")
  .replace("3000", "3001");
console.log("socket url", socketURL);

const socket = new WebSocket(socketURL);

function App() {
  const [user, setUser] = useState(null);
  console.log("connecting socket from", socketURL);

  const [header, setHeader] = useState(
    "Welcome to Arx, start chatting and meeting new people!!!"
  );
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState();
  const [timeLeft, setTimeLeft] = useState(null);

  const [likeIt, setLikeIt] = useState(false);
  const [finishAuditer, setFinishAuditer] = useState(false);
  const [finish, setFinish] = useState(false);

  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
  const initialState = {
    conversations: [],
  };
  const [
    currentConversationMessages,
    setCurrentConversationMessages,
  ] = useState([]);

  const [pruebaState, setPruebaState] = useState(false);
  const reducer = (state, action) => {
    console.log("state en reducer", state);
    switch (action.type) {
      case "changeConv":
        return {
          ...state,
          conversations: state.conversations.map((cc) =>
            (cc.user1dbId === action.payload.user1dbId &&
              cc.user2dbId === action.payload.user2dbId) ||
            (cc.user1dbId === action.payload.user2dbId &&
              cc.user2dbId === action.payload.user1dbId)
              ? action.payload
              : cc
          ),
        };
      case "changeAll":
        return { ...state, conversations: action.payload };
      default:
        return state;
    }
  };
  const [conversations, dispatch] = useReducer(reducer, initialState);

  const changeUserData = (payload) => {
    let us = { ...user };
    for (let attr in payload) {
      us[attr] = payload[attr];
    }
    setUser(us);
  };

  useEffect(() => {
    console.log(
      "cambiooooo",
      conversations,
      conversations.length,
      currentConversationIndex
    );
    if (
      conversations &&
      conversations.length &&
      currentConversationIndex !== undefined &&
      currentConversationIndex !== null
    )
      setCurrentConversationMessages(
        conversations[currentConversationIndex].messages || []
      );
  }, [conversations]);

  const checkTime = (i) => {
    if (i < 10) {
      i = "0" + i;
    } // add zero in front of numbers < 10
    return i;
  };

  //login stuffs jaja
  useEffect(() => {
    //fetch to get matche
    if (!user)
      //fetch to validate auth
      fetch("/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("failed to authenticate user");
        })
        .then((responseJson) => {
          console.log("respuesta al login fetch", responseJson);
          setUser(responseJson && responseJson.user);
        })
        .catch((error) => {
          console.log("error ", error);
          fetch("/auth/emailValidate", {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          })
            .then((res) => {
              if (res.status && res.status === 200) return res.json();
            })
            .then((data) => {
              if (data && data.success && data.user) {
                setUser(data.user);
              } else {
                console.log("error validating data", data);
              }
            })
            .catch((err) => {
              console.log("err validating", err);
            });
        });
  }, []);

  useEffect(() => {
    console.log("cambio user", user);
    if (user && user._id && user.name) {
      if (socket) socket.send(JSON.stringify({ state: 4, message: user._id }));
      else {
        //recargar sitio
      }

      fetch(`/conversations?userid=${user._id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((res) => {
          if (res.status === 200) return res.json();
          throw new Error("failed to authenticate user");
        })
        .then((data) => {
          console.log("respuesta al fetch de matchs", data);
          if (data && data.conversations)
            dispatch({ type: "changeAll", payload: data.conversations });
        })
        .catch((error) => {
          console.log("error ", error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        console.log("holu socket conectado");
        socket.onerror = function (event) {
          console.error("WebSocket error observed", event);
        };
      };
      socket.onmessage = (inMsg) => {
        const data = JSON.parse(inMsg.data);
        if (data.state === 0) console.log("llego el puto mensaje", data);

        if (data.state === 0) {
          setMessages((d) => {
            d.push(
              [false, data.message, Math.floor(Date.now() / 1000)].join(
                "%=%splitmessage%=%"
              )
            );
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
            let c = {
              betterHalf: data.senderId,
            };
            if (data.receiverId) c["mySocketId"] = data.receiverId;
            setChat(c);
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
          setChat(c);
        } else if (data.state === 5) {
          if (data.timeLeft === "its_gone") {
            setMessages([]);
            setChat(null);
            setFinish(false);
            setHeader("Welcome to Arx, start chatting and meeting new people!");
          } else {
            if (data.timeLeft < 0) {
              setFinish(true);
            }
            const timeStr =
              data.timeLeft >= 0
                ? checkTime(new Date(data.timeLeft).getMinutes()) +
                  ":" +
                  checkTime(new Date(data.timeLeft).getSeconds())
                : "00:" + checkTime(Math.floor(15 + data.timeLeft / 1000));
            setTimeLeft(timeStr);
          }
        } else if (data.state === 6) {
          console.log("cambio daata conversations", data);
          const conversation = data.data;
          dispatch({ type: "changeConv", payload: conversation });
        }
      };
    } else {
      console.log("no hay socket");
    }
  }, []);

  useEffect(() => {
    if (likeIt && finish && !finishAuditer && user && user._id && user.name) {
      console.log("detectó el like");
      if (socket) {
        socket.send(
          JSON.stringify({
            state: 1,
            receiverId: chat.betterHalf,
            heart: true,
            dbId: user._id,
            userName: user.name,
          })
        );
        setFinishAuditer(true);
      } else console.log("no hay socket para enviar like");

      setFinish(false);
    }
  }, [likeIt, finish]);

  const onHeart = () => {
    setLikeIt(true);
  };

  const onCancel = () => {
    if (socket) {
      socket.send(
        JSON.stringify({
          state: 5,
          receiverId: chat.betterHalf,
          message: "le dieron dislike",
        })
      );
    }
  };

  const sendMessage = (msg) => {
    if (socket) {
      let payload = { state: 0, message: msg };
      if (chat && chat.betterHalf) payload["receiverId"] = chat.betterHalf;
      if (chat && chat.mySocketId) payload["senderId"] = chat.mySocketId;

      socket.send(JSON.stringify(payload));
      setMessages(
        (d) => (
          d.push(
            [true, msg, Math.floor(Date.now() / 1000)].join(
              "%=%splitmessage%=%"
            )
          ),
          [...new Set(d)]
        )
      );
      console.log("mesg mandado", JSON.stringify(payload));
    } else {
      console.log("socket not found ");
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.open("/auth/logout", "_self");
  };
  return (
    <div className='App'>
      <Router>
        <Navbar
          handleLogout={handleLogout}
          user={user}
          conversations={conversations.conversations}
        />
        <Switch>
          <Route path='/signin'>
            <Login setUser={setUser} />
          </Route>
          <Route path='/profile'>
            <Profile user={user}></Profile>
          </Route>
          <Route path='/signup'>
            <RegisterInit />
          </Route>
          <Route path='/meet'>
            {user ? (
              user.name &&
              user.gender &&
              user.age &&
              user.lkfAgeMin &&
              user.lkfAgeMax &&
              user.lkfGender ? (
                !chat ? (
                  <Home header={header} initChatIntent={sendMessage} />
                ) : (
                  <Chat
                    timeLeft={timeLeft}
                    chat={chat}
                    finish={finish}
                    likeIt={likeIt}
                    socket={socket}
                    messages={messages}
                    sendMessage={sendMessage}
                    onHeart={onHeart}
                    onCancel={onCancel}
                    user={user}
                    conversations={conversations.conversations}
                    currentChat={
                      conversations.conversations[currentConversationIndex]
                    }
                  />
                )
              ) : (
                <Register user={user} changeUserData={changeUserData} />
              )
            ) : (
              <Login setUser={setUser} />
            )}
          </Route>

          <Route path='/#_=_'>
            {user ? (
              user.name &&
              user.gender &&
              user.age &&
              user.lkfAgeMin &&
              user.lkfAgeMax &&
              user.lkfGender ? (
                conversations.conversations &&
                conversations.conversations.length ? (
                  <Matches
                    conversations={conversations.conversations}
                    user={user}
                    currentChat={
                      conversations.conversations[currentConversationIndex]
                    }
                    setCurrentConversation={setCurrentConversationIndex}
                    currentConversationMessages={currentConversationMessages}
                  />
                ) : !chat ? (
                  <Home header={header} initChatIntent={sendMessage} />
                ) : (
                  <Chat
                    timeLeft={timeLeft}
                    chat={chat}
                    finish={finish}
                    likeIt={likeIt}
                    socket={socket}
                    messages={messages}
                    sendMessage={sendMessage}
                    onHeart={onHeart}
                    onCancel={onCancel}
                    user={user}
                    conversations={conversations.conversations}
                    currentChat={
                      conversations.conversations[currentConversationIndex]
                    }
                  />
                )
              ) : (
                <Register user={user} changeUserData={changeUserData} />
              )
            ) : (
              <Login setUser={setUser} />
            )}
          </Route>
          <Route path='/'>
            {user ? (
              user.name &&
              user.gender &&
              user.age &&
              user.lkfAgeMin &&
              user.lkfAgeMax &&
              user.lkfGender ? (
                conversations.conversations &&
                conversations.conversations.length ? (
                  <Matches
                    conversations={conversations.conversations}
                    user={user}
                    currentChat={
                      conversations.conversations[currentConversationIndex]
                    }
                    setCurrentConversation={setCurrentConversationIndex}
                    currentConversationMessages={currentConversationMessages}
                  />
                ) : !chat ? (
                  <Home header={header} initChatIntent={sendMessage} />
                ) : (
                  <Chat
                    timeLeft={timeLeft}
                    chat={chat}
                    finish={finish}
                    likeIt={likeIt}
                    socket={socket}
                    messages={messages}
                    sendMessage={sendMessage}
                    onHeart={onHeart}
                    onCancel={onCancel}
                    user={user}
                    conversations={conversations.conversations}
                    currentChat={
                      conversations.conversations[currentConversationIndex]
                    }
                  />
                )
              ) : (
                <Register user={user} changeUserData={changeUserData} />
              )
            ) : (
              <Login setUser={setUser} />
            )}
          </Route>
          <Route path='/random'>{/* landing page */}</Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
