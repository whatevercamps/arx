import React, { useState } from "react";
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

const Chat = (props) => {
  console.log("mensajes", props.messages);
  const [message, setMessage] = useState("");
  const onMessageSent = (evt) => {
    evt.preventDefault();
    props.sendMessage(message);
  };

  return (
    <div className='Chat'>
      <div className='row'>
        <div className='col-3'></div>
        <div className='col-6 chat-content'>
          <div className='chat'>
            <div className='row chat-header'>
              <div className='col-8'>
                <h2>David Bautista</h2>
              </div>
              <div className='row col-4 time'>
                <div className='col-7'>
                  <FontAwesomeIcon icon={faClock} id='clock'></FontAwesomeIcon>
                </div>
                <div className='col-5'>
                  <p>2:45</p>
                </div>
              </div>
            </div>
            <hr></hr>
            <div className='row chat-space'>
              {props.messages.map((message) => (
                <ChatMessage message={message} />
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
        <div className='col-3'>
          <div className='actions'>
            <ul>
              <li>
                {" "}
                <FontAwesomeIcon icon={faHeart} id='heart'></FontAwesomeIcon>
              </li>
              <li>
                {" "}
                <FontAwesomeIcon icon={faStar} id='star'></FontAwesomeIcon>
              </li>
              <li>
                {" "}
                <FontAwesomeIcon icon={faSmile} id='smile'></FontAwesomeIcon>
              </li>
              <li>
                {" "}
                <FontAwesomeIcon icon={faFilm} id='film'></FontAwesomeIcon>
              </li>
              <li>
                {" "}
                <FontAwesomeIcon icon={faMagic} id='magic'></FontAwesomeIcon>
              </li>
              <li>
                {" "}
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  id='cancel'
                ></FontAwesomeIcon>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
