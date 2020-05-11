import React, { useState, useEffect } from "react";
import MatchList from "./MatchList";
import Profile from "./Profile";
import Chat from "./Chat/Chat";

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

  return (
    <div>
      <div className='row'>
        <div className='col-3'>
          <MatchList {...props} setCurrentChat={setCurrentConversation} />
        </div>
        <div className='col-5'>
          {currentChat && currentChat.messages ? (
            <Chat messages={currentChat.messages} />
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
