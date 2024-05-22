import React, { useState, useContext } from "react";
import "./Dashboard.css";
import { CartContext } from "../../App";
import Swal from "sweetalert2";

function Dashboard() {
  var [showMenu, setShowMenu] = useState(false);
  var { userData } = useContext(CartContext);
  var fullName = userData.fullName;
  var [firstN, middleN, lastN] = [...fullName.split(" ")];

  const showAccountDetails = () => {
    Swal.fire({
      position: "center",
      icon: "info",
      title: "Fund Account",
      html: `
            <div style="text-align: center; ">
                <p style="margin-bottom: 0.5rem;">Make a transfer into the following account to fund your wallet. Your transfer will reflect in your balance within minutes.</p>
                <b style="color: #ff2e8c;">Account number</b>
                <p  style="margin-bottom: 0.5rem;"> ${userData.account} </p>
                <b  style="color: #ff2e8c;">Account Name</b>
                <p  style="margin-bottom: 0.5rem;">${userData.fullName}</p>
                <b  style="color:#ff2e8c;">Bank</b>
                <br>
                <p>Hope PSB</p>
            </div>
            `,
      showConfirmButton: true,
      confirmButtonColor: "#ff2e8c",
      confirmButtonText: "Ok, Got it!",
      iconColor: "#ff2e8c",
    });
  };

  return (
    <div className="dashboardMainFrame">
      <div className="dashboardHeader">
        <img src="/osele-logo.png" />
        <div>
          <p onClick={showAccountDetails}>
           <svg style={{ fill: "black" }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z"/></svg>
          </p>
          <p
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <svg
              style={{ fill: "black" }}
              xmlns="http://www.w3.org/2000/svg"
              height="23px"
              viewBox="0 -960 960 960"
              width="23px"
            >
              <path d="M666-440 440-666l226-226 226 226-226 226Zm-546-80v-320h320v320H120Zm400 400v-320h320v320H520Zm-400 0v-320h320v320H120Zm80-480h160v-160H200v160Zm467 48 113-113-113-113-113 113 113 113Zm-67 352h160v-160H600v160Zm-400 0h160v-160H200v160Zm160-400Zm194-65ZM360-360Zm240 0Z" />
            </svg>
          </p>
        </div>
      </div>

      {/* <div className='line'></div> */}
      <p className="dashboardHeading">Dashboard</p>

      <div className="sections-menu-cont">
        <div className={"menu" + (showMenu ? " showDashboardMenu" : "")}>
          <p
            className="dashboardCloseBtn"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </p>

          <div className="menu-items">
            <div className="menu-item">
              <p>
               
                <svg style={{ fill: "black" }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
              </p>
              <p
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
              >
                <a style={{ color: "black" }} href="/">
                  Home
                </a>
              </p>
            </div>

            <div className="menu-item">
              <p>
              <svg style={{ fill: "black" }}  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm0-160q17 0 28.5-11.5T520-480q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480q0 17 11.5 28.5T480-440Zm0-160q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm320 440H160q-33 0-56.5-23.5T80-240v-160q33 0 56.5-23.5T160-480q0-33-23.5-56.5T80-560v-160q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v160q-33 0-56.5 23.5T800-480q0 33 23.5 56.5T880-400v160q0 33-23.5 56.5T800-160Zm0-80v-102q-37-22-58.5-58.5T720-480q0-43 21.5-79.5T800-618v-102H160v102q37 22 58.5 58.5T240-480q0 43-21.5 79.5T160-342v102h640ZM480-480Z"/></svg>
              </p>
              <p
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
              >
                <a style={{ color: "black" }} href="/dashboard#top-flex">
                  My Tickets
                </a>
              </p>
            </div>

            <div className="menu-item">
              <p>
              <svg  style={{ fill: "black" }}  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M600-80v-80h160v-400H200v160h-80v-320q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H600ZM320 0l-56-56 103-104H40v-80h327L264-344l56-56 200 200L320 0ZM200-640h560v-80H200v80Zm0 0v-80 80Z"/></svg>
              </p>
              <p
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
              >
                <a style={{ color: "black" }} href="/#Latest-events">
                  Upcoming events
                </a>
              </p>
            </div>

            <div className="menu-item">
              <p>
              <svg style={{ fill: "black" }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
              </p>
              <p
                onClick={() => {
                  setShowMenu(!showMenu);
                  localStorage.removeItem("oseleTicketsUser");
                }}
              >
                <a style={{ color: "black" }} href="/">
                  Logout
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="sectionsCont">
          <div className="wallet-tickets-cont">
            <div className="walletCont top-flex">
              <p>Welcome back, {firstN}</p>
              <div className="walletSubCont xx">
                <div className="iconCont">
                  <svg style={{ fill: "black" }} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z"/></svg>
                  <p>Balance:</p>
                </div>
                <p>N{userData.balance}</p>
              </div>
            </div>

            <div className="walletCont top-flex" id="top-flex">
              <p>Tickets</p>
              <div className="ticketsSubCont">
                <img src="/hero.jpg" />
                <div className="ticketDetails">
                  <p>
                    <b>Ticket No:</b> #AYL434
                  </p>
                  <p>
                    <b>Event Name:</b> AY live in concert - Lagos
                  </p>
                  <p>
                    <b>Price:</b> N4000
                  </p>
                  <p>
                    <b>Date:</b> 2024-06-06
                  </p>
                </div>
              </div>

              <div className="ticketsSubCont">
                <img src="/hero.jpg" />
                <div className="ticketDetails">
                  <p>
                    <b>Ticket No:</b> #AYL434
                  </p>
                  <p>
                    <b>Event Name:</b> AY live in concert - Lagos
                  </p>
                  <p>
                    <b>Price:</b> N4000
                  </p>
                  <p>
                    <b>Date:</b> 2024-06-06
                  </p>
                </div>
              </div>

              <div className="ticketsSubCont">
                <img src="/hero.jpg" />
                <div className="ticketDetails">
                  <p>
                    <b>Ticket No:</b> #AYL434
                  </p>
                  <p>
                    <b>Event Name:</b> AY live in concert - Lagos
                  </p>
                  <p>
                    <b>Price:</b> N4000
                  </p>
                  <p>
                    <b>Date:</b> 2024-06-06
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
