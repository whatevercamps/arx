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
} from "@fortawesome/free-solid-svg-icons";

import ChatMessage from "../ChatMessage";
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
      <div className='row'>
        <div className='col-12 chat-content'>
          <div className='chat'>
            <div className='row chat-header'>
              <div className={props.timeLeft ? "col-8" : "col-12"}>
                <h3>David Bautista</h3>
              </div>
              {props.timeLeft && (
                <div className='row col-4 time'>
                  <div className='col-7'>
                    <FontAwesomeIcon
                      icon={faClock}
                      id='clock'
                    ></FontAwesomeIcon>
                  </div>
                  <div className='col-5'>
                    <p>{props.timeLeft}</p>
                  </div>
                </div>
              )}
            </div>
            <hr></hr>
            <div ref={refForScroll} className='chat-space'>
              {props.messages.map((message) => (
                <ChatMessage message={message.split("%=%splitmessage%=%")} />
              ))}
            </div>
            <form onSubmit={onMessageSent}>
              <div className='row send'>
                <div className='col-11 message'>
                  <input
                    type='text'
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
  );
};

export default MatchChat;