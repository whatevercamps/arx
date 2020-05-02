import React from "react";

function ChatMessage(props) {
  return (
    props.message && (
      <div
        className={props.message.isMine ? "mine messages" : "yours messages"}
      >
        <div className='message'>{props.message.message}</div>
      </div>
    )
  );
}

export default ChatMessage;
