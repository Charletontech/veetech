import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Screen2 = () => {
  const navigate = useNavigate();

  return (
    <div className="frame" style={{ background: "var(--bg)" }}>
      <Navbar />
      <div className="screen2Cont">
        <div className="box" onClick={() => navigate("/screen3")}>
          <div>
            <h2>Take an exam</h2>
          </div>
        </div>
        <div className="box" onClick={() => navigate("/get-access-token")}>
          <div>
            <h2>Get access token</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen2;
