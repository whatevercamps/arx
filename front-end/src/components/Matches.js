import React, { useState, useEffect } from "react";
import MatchList from "./MatchList";
import Profile from "./Profile";
import MatchChat from "./Chat/MatchChat";

function Matches(props) {
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    console.log("props conversations", props.conversations);
    console.log("props users", props.users);
  }, [props]);

  const setCurrentConversation = (index) => {
    console.log("index", index);
    if (
      props.conversations &&
      index >= 0 &&
      index < props.conversations.length &&
      index != currentChat
    )
      setCurrentChat(props.conversations[index]);
  };

  const sendMessage = (message) => {
    if (
      message.trim().trim().length &&
      currentChat &&
      currentChat.user1dbId &&
      currentChat.user2dbId &&
      props.user &&
      props.user._id
    ) {
      const payload = {
        user1id: currentChat.user1dbId,
        user2id: currentChat.user2dbId,
        messages: [`${props.user._id}%=%splitmessage%=%${message}`],
      };
      fetch("http://localhost:3001/conversations/addMessages", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(payload),
      }).then((res) => {
        console.log("resp", res);

        if (res.status === 200) {
          console.log("mensaje enviado");
        }
      });
    }
  };

  return (
    <div className='Matches'>
      <div className='row'>
        <div className='col-3 matchList'>
          <MatchList {...props} setCurrentChat={setCurrentConversation} />
        </div>
        <div className='col-5 currentChat'>
          {currentChat && currentChat.messages ? (
            <MatchChat
              messages={currentChat.messages}
              sendMessage={sendMessage}
            />
          ) : (
            <></>
          )}
        </div>
        <div className='col-4'>
          <Profile />
        </div>
      </div>
    </div>
  );
}

export default Matches;
