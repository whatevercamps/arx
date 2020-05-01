import React from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import "./App.css";

const Home = () => {
  return (
    <div className='Home'>
      <div className='send-message'>
        <div>
          <h1>Welcome to Arx, start chatting and meeting new people!</h1>
          <input type='text'></input>
        </div>
      </div>
    </div>
  );
};

export default Home;
