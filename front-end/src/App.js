import React, { useState } from "react";
// import Home from "./Home";
import Home from "./Home";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Login from "./components/Login/Login";
function App() {
  const [user, setUser] = useState(null);
  return (
    <div className='App'>
      <Navbar />
      {true ? <Home /> : <Login />}
      <Footer />
    </div>
  );
}

export default App;
