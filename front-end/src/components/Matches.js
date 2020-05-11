import React, { useState, useEffect } from "react";
import MatchList from "./MatchList";
import Profile from "./Profile";
import MatchChat from "./Chat/MatchChat";

function Matches(props) {
  useEffect(() => {
    console.log(
      "props conversation",
      props.conversations,
      props.conversations2
    );
    console.log("props users", props.users);
  }, [props]);

  const sendMessage = (message) => {
    if (
      message.trim().trim().length &&
      props.currentChat &&
      props.currentChat.user1dbId &&
      props.currentChat.user2dbId &&
      props.user &&
      props.user._id
    ) {
      const payload = {
        user1id: props.currentChat.user1dbId,
        user2id: props.currentChat.user2dbId,
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
          <MatchList {...props} setCurrentChat={props.setCurrentConversation} />
        </div>
        <div className='col-5 currentChat'>
          {props.currentChat && props.currentChat.messages ? (
            <MatchChat
              messages={props.currentChat.messages}
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
