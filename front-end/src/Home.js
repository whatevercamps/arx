//hace falta el proptypes
import React, { useRef, useState } from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import "./App.css";
import ParticlesWrapper from "./components/Particles/ParticlesWrapper";

const Home = (props) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef();

  const onMessageSent = (evt) => {
    evt.preventDefault();
    props.initChatIntent(message);
  };

  return (
    <div className='Home'>
      {props.usersData && <ParticlesWrapper usersData={props.usersData} />}
      <main className='send-message'>
        <div>
          <h1 id='home-title'>
            {props.header ||
              "Welcome to Arx, start chatting and meeting new people!"}
          </h1>
          <form onSubmit={onMessageSent}>
            <input
              placeholder='type something'
              type='text'
              value={message}
              onChange={(evt) => {
                setMessage(evt.target.value);
              }}
            ></input>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
