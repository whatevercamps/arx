import React, { useRef, useState } from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import "./App.css";

const Home = (props) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef();

  const onMessageSent = (evt) => {
    evt.preventDefault();
    props.initChatIntent(message);
  };

  return (
    <div className='Home'>
      <div className='send-message'>
        <div>
          <h1>
            {props.header ||
              "Welcome to Arx, start chatting and meeting new people!"}
          </h1>
          <form onSubmit={onMessageSent}>
            <input
              type='text'
              value={message}
              onChange={(evt) => {
                setMessage(evt.target.value);
              }}
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
