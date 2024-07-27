import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Home.css";

const Screen1 = () => {
  const navigate = useNavigate();

  return (
    <div className="frame" style={{ background: "#e9fcf3" }}>
      <Navbar />
      <div className="screen1Cont">
        <img src="undraw_reading.png" alt="hero" />
        <div>
          <h2>Nigeria's number one exam prep platform</h2>
          <ul>
            <li>Purchase access token</li>
            <li>Take an exam</li>
            <li>View and download your result</li>
          </ul>
          <button onClick={() => navigate("/screen2")}>Get started</button>
        </div>
      </div>
    </div>
  );
};

export default Screen1;
