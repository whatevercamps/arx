import React from "react";

function ChatMessage(props) {
  return (
    props.message && (
      <div
        className={
          props.message[0] === "true" ? "mine messages" : "yours messages"
        }
      >
        <div className='message'>{props.message[1]}</div>
      </div>
    )
  );
}

export default ChatMessage;
