import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faPaperPlane,
  faHeart,
  faStar,
  faSmile,
  faFilm,
  faMagic,
  faTimesCircle,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

import ChatMessage from "../ChatMatchMessage";
import LikeOrNot from "../LikeOrNot";
const MatchChat = (props) => {
  const refForScroll = useRef();

  const [message, setMessage] = useState("");
  const onMessageSent = (evt) => {
    evt.preventDefault();

    props.sendMessage(message);
    setMessage("");
  };

  const onHeart = () => {
    props.onHeart();
  };

  const onCancel = () => {
    props.onCancel();
  };

  useEffect(() => {
    const element = refForScroll.current;
    element.scrollTop = element.scrollHeight;
  }, [props.messages]);

  return (
    <div className='MatchChat'>
      {props.finish && props.likeIt === false ? (
        <LikeOrNot {...props} />
      ) : (
        <></>
      )}
      {props.select === true ? (
        <div className='row matchChat'>
          <div className='col-12 chat-content'>
            <div className='chat'>
              <div className='row chat-header'>
                <div className='col-11 current-header'>
                  {props.user.name === props.currentChat.user1name ? (
                    <h3>{props.currentChat.user2name.split(" ")[0]}</h3>
                  ) : (
                    <h3>{props.currentChat.user1name.split(" ")[0]}</h3>
                  )}
                </div>
                <div className='col-1 current-header more-ops'>
                  <button disabled id='more'>
                    <FontAwesomeIcon icon={faEllipsisH}></FontAwesomeIcon>
                  </button>
                </div>
              </div>
              <hr></hr>
              <div ref={refForScroll} className='chat-space'>
                {props.messages.map((message) => (
                  <ChatMessage
                    user={props.user}
                    message={message.split("%=%splitmessage%=%")}
                  />
                ))}
              </div>
              <div className='send-space'>
                <form onSubmit={onMessageSent}>
                  <div className='row send'>
                    <div className='col-11 message'>
                      <input
                        type='text'
                        placeholder='Type a message'
                        value={message}
                        onChange={(evt) => {
                          setMessage(evt.target.value);
                        }}
                      />
                    </div>
                    <div className='col-1 send-icon'>
                      <button type='submit' className='paper'>
                        {" "}
                        <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div ref={refForScroll}></div>
      )}
    </div>
  );
};

export default MatchChat;
