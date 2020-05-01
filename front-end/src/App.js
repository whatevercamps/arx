import React from "react";
// import Home from "./Home";
import Chat from "./components/Chat";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

function App() {
  return (
    <div className='App'>
      {/* <Home /> */}
      <Navbar />
      <Chat />
      <Footer />
    </div>
  );
}

export default App;
