import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Menu = ({ toggleHomeMenu, setToggleHomeMenu }) => {
  const navigate = useNavigate();
  const showContactUsAlert = () => {
    Swal.fire({
      title: "Contact Us",
      html: `
      <b>Email</b> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-470 120-690v-50h720v50L480-470ZM120-240v-410l240 160 71 47 71-47 240-160v410H120Z"/></svg><br/> info@veetech.online <br> 
      <b>Phone</b> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/></svg><br/> 09063469709`,
      icon: "info",
      confirmButtonText: "Close",
      confirmButtonColor: "#69ce7d",
    });
  };
  return (
    <div
      className="homeMenu"
      style={
        toggleHomeMenu ? { opacity: 1, zIndex: 3 } : { opacity: 0, zIndex: -3 }
      }
    >
      <div>
        <img src="v-logo.png" alt="logo" />
        <p onClick={() => setToggleHomeMenu(!toggleHomeMenu)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            viewBox="0 -960 960 960"
            width="30"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </p>
      </div>

      <ul>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/get-access-token")}>Get access token</li>
        <li onClick={() => navigate("/screen3")}>Take an exam</li>
        <li onClick={showContactUsAlert}>Contact us</li>
      </ul>
    </div>
  );
};

export default Menu;
