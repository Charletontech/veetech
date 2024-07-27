import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { MainContext } from "../../App";
import Swal from "sweetalert2";

// Sweetalert Custom alert
function customAlert(title, message, icon) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: `${icon}`,
    title: `${title}`,
    text: `${message}`,
  });
}

const Screen3 = () => {
  const navigate = useNavigate();
  const { setExamType, setNoOfSubjects } = useContext(MainContext);
  return (
    <div className="frame">
      <Navbar />
      <h4 className="screen3header">Featured Exams</h4>
      <div className="screen3Cont">
        <div
          onClick={() => {
            navigate("/set-up-exam");
            setExamType("JAMB");
            setNoOfSubjects(4);
          }}
        >
          <img src="JAMB-LOGO.jpg" alt="img" />
          <h2>JAMB(UTME)</h2>
        </div>
        <div
          onClick={() => {
            navigate("/set-up-exam");
            setExamType("WAEC");
            setNoOfSubjects(1);
          }}
        >
          <img src="waec.png" alt="img" />
          <h2>WAEC</h2>
        </div>
        <div
          onClick={() => {
            customAlert(
              "Not Available",
              "Oops! This exam is currently not available. Why not try some other one",
              "info"
            );
          }}
        >
          <img src="a-level.png" alt="img" />
          <h2>A LEVEL</h2>
        </div>
      </div>
    </div>
  );
};

export default Screen3;
