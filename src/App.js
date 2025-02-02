import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import logo from "./nova.png";
import Login from "./Login";
import SignUp from "./SignUp";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="wave-bg"></div>
      <div className="content">
        <img src={logo} alt="NOVA Logo" className="logo" />
        <h1>NOVA – Your Personalized AI Medical Assistant</h1>
      </div>
      <div className="buttons">
        <button className="secondary" onClick={() => navigate("/login")}>Referred? Log in</button>
        <button className="primary" onClick={() => navigate("/signup")}>Create an Account</button>
      </div>
    </div>
    
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
