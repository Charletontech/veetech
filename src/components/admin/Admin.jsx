import { useState, useEffect } from "react";
import "./Admin.css";
import AllEvents from "./AllEvents";
import PostMyEvent from "./PostMyEvent";
import CustomersList from "./CustomersList";
import TicketsSold from "./TicketsSold";
import TicketSalesSpreadsheet from "./TicketSalesSpreadsheet";
import CreateEvent from "./CreateEvent";
import GetRequestOptions from "../GetRequestOptions";

function Admin() {
  const [adminMenuItemNo, setAdminMenuItemNo] = useState(5);
  const [toggleAdminMenu, setToggleAdminMenu] = useState(false);
  const [ticketsSold, setTicketsSold] = useState(null);
  
  // data from database
  const [events, setEvents] = useState(null);
  const [customers, setCustomers] = useState(null)

  useEffect(() => {
    fetch('https://osele-tickets-server.onrender.com/get-all-events', GetRequestOptions('GET'))
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => alert(err));

      fetch('https://osele-tickets-server.onrender.com/get-all-customers', GetRequestOptions('GET'))
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => alert("Error occured while getting cusomers: ", err));

      fetch('https://osele-tickets-server.onrender.com/get-all-tickets-sold', GetRequestOptions('GET'))
      .then(res => res.json())
      .then(data => setTicketsSold(data))
      .catch(err => {console.log(err); alert("An error occured while loading Tickets Sold: ", err)})
  }, []);


  const adminMenuList = [<AllEvents events={events} />, <PostMyEvent />, <TicketSalesSpreadsheet events={events}/>, <TicketsSold  ticketsSold={ticketsSold} />, <CustomersList customers={customers} />, <CreateEvent/>];
  const menuTitles = ["All Events", "Post My Event", "Download Event Spreadsheet", "Tickets Sold", "All Customers", "Create Event"]

  
  const initDB = () => {
    fetch('https://osele-tickets-server.onrender.com/db-init', GetRequestOptions('GET'))
    .then(res => res.json())
    .then(data => alert(data))
    .catch(err => alert(err))
  }
  
  
  return (
    <div id="admin-general-container">
      <aside
        className={
          "admin-side-bar " + (toggleAdminMenu ? "show-admin-sidebar" : "")
        }
      >
        <p onClick={() => setToggleAdminMenu(!toggleAdminMenu)}>
          <svg
            style={{ fill: "#6b6161" }}
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 -960 960 960"
            width="20"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </p>
        <ul>
          <li onClick={() => {setAdminMenuItemNo(0); setToggleAdminMenu(!toggleAdminMenu)}}>
            <svg
              style={{ fill: " #f6006d" }}
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
            >
              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
            </svg>{" "}
            <p>All Events</p>
          </li>
        <li onClick={() => {setAdminMenuItemNo(1); setToggleAdminMenu(!toggleAdminMenu)}}>
            <svg
              style={{ fill: " #f6006d" }}
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
            >
              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
            </svg>{" "}
            <p>Post My Event</p>
          </li>
          <li onClick={() => {setAdminMenuItemNo(2); setToggleAdminMenu(!toggleAdminMenu)}}>
            <svg
              style={{ fill: " #f6006d" }}
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
            >
              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
            </svg>{" "}
            <p>Ticket Sales Spreadsheet</p>
          </li>
          <li onClick={() => {setAdminMenuItemNo(3); setToggleAdminMenu(!toggleAdminMenu)}}>
            <svg
              style={{ fill: " #f6006d" }}
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
            >
              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
            </svg>{" "}
            <p>Tickets Sold</p>
          </li>
          <li onClick={() => {setAdminMenuItemNo(4); setToggleAdminMenu(!toggleAdminMenu)}}>
            <svg
              style={{ fill: " #f6006d" }}
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
            >
              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
            </svg>{" "}
            <p>Customers List</p>
          </li>

          <li onClick={() => {setAdminMenuItemNo(5); setToggleAdminMenu(!toggleAdminMenu)}}>
            <svg
              style={{ fill: " #f6006d" }}
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
            >
              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
            </svg>{" "}
            <p>Create Event</p>
          </li>

          <li onClick={initDB}>
            <svg
              style={{ fill: " #f6006d" }}
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
            >
              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
            </svg>{" "}
            <p>Init Database</p>
          </li>
        </ul>
      </aside>

      <div className="admin-main-area">
        <div
          className="dashboardHeader"
          style={{ background: "white", padding: "8px", borderRadius: "10px" }}
        >
          <img src="/osele-logo.png" alt="img" />
          {/* <h2 style={{fontWeight: '600'}}>Admin</h2> */}
          <div>
            <p onClick={() => setToggleAdminMenu(!toggleAdminMenu)}>
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

        <div className="admin-title">
          <p>{menuTitles[adminMenuItemNo]}</p>
        </div>

        {adminMenuList[adminMenuItemNo]}
      </div>
    </div>
  );
}

export default Admin;
