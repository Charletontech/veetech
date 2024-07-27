import { useState } from "react";
import React from "react";
import Menu from "./Menu";
import Swal from "sweetalert2";

const Navbar = () => {
  const [toggleHomeMenu, setToggleHomeMenu] = useState(false);
  const showContactUsAlert = () => {
    Swal.fire({
      title: "Contact Us",
      html: `
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-470 120-690v-50h720v50L480-470ZM120-240v-410l240 160 71 47 71-47 240-160v410H120Z"/> <b>Email</b>  </svg><br/> info@veetech.online <br> 
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/></svg><b>Phone</b> <br/> 09063469709`,
      icon: "info",
      confirmButtonText: "Close",
      confirmButtonColor: "#69ce7d",
    });
  };
  return (
    <>
      <nav className="mainNav">
        <img src="v-logo.png" alt="logo" />
        <div>
          <p onClick={showContactUsAlert}>
            <svg
              height="30"
              width="30"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              id="customer-care"
            >
              <path d="M54,27.29v-.35a21.94,21.94,0,1,0-43.88.12v.2A7,7,0,0,0,5,34v2a7,7,0,0,0,7,7h1.05A13,13,0,0,0,26,55h6a5,5,0,0,0,5-5V49a1,1,0,0,0-1-1H28a1,1,0,0,0-1,1v4H26A11,11,0,0,1,15,42V28a1,1,0,0,0-1-1H12.12A19.94,19.94,0,1,1,52,26.94V27H50a1,1,0,0,0-1,1V42a1,1,0,0,0,1,1h2a7,7,0,0,0,7-7V34A7,7,0,0,0,54,27.29ZM29,50h6a3,3,0,0,1-3,3H29ZM13,41H12a5,5,0,0,1-5-5V34a5,5,0,0,1,5-5h1Zm44-5a5,5,0,0,1-5,5H51V29h1a5,5,0,0,1,5,5Z"></path>
            </svg>
          </p>

          <p onClick={() => setToggleHomeMenu(!toggleHomeMenu)}>
            <svg
              height="26"
              width="30"
              viewBox="0 0 100 80"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100" height="7" rx="5" ry="5" />
              <rect y="35" x="50" width="50" height="7" rx="5" ry="5" />
              <rect y="70" width="100" height="7" rx="5" ry="5" />
            </svg>
          </p>
        </div>
      </nav>

      <Menu
        toggleHomeMenu={toggleHomeMenu}
        setToggleHomeMenu={setToggleHomeMenu}
      />
    </>
  );
};

export default Navbar;
