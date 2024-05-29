import React, { useState } from "react";

const AllEvents = ({events}) => {
  var [toggleAdminModal, setToggleAdminModal] = useState(false);
  var [itemToShowDetails, setItemToShowDetails] = useState(0)

  return (
    <>
      <div className="admin-content-area" id="admin-events-container">
        {/* event detail modal */}
        <div
          className={"admin-modal-overlay"}
          style={
            toggleAdminModal
              ? { opacity: "1", zIndex: "5" }
              : { opacity: "0", zIndex: "-5" }
          }
        >
          <div className="admin-content">
            <p
              onClick={() => {
                setToggleAdminModal(!toggleAdminModal);
              }}
            >
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

            <h4>Event name</h4>
            <p>{events? events[itemToShowDetails].eventName : "Fetching..."}</p>

            <h4>Description</h4>
            <p>
              {events? events[itemToShowDetails].description : "Fetching..."}
            </p>

            <h4>Date</h4>
            <p>{events? events[itemToShowDetails].date : "Fetching..."}</p>

            <h4>Location</h4>
            <p>{events? events[itemToShowDetails].location : "Fetching..."}</p>

            <h4>Event code</h4>
            <p>#{events? events[itemToShowDetails].eventCode : "Fetching..."}</p>

            <h4>Organizer</h4>
            <p>{events? events[itemToShowDetails].organizer : "Fetching..."}</p>

            <h4>Number of Tickets</h4>
            <p>{events? events[itemToShowDetails].noOfGuests : "Fetching..."}</p>

            

            <h4>Tickets prices</h4>
            <div>
              {events? 
              Object.entries(JSON.parse(events[itemToShowDetails].ticketPrices)[0]).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              )) : "Fetching..."
            }
             
            </div>

            <h4>Star rating</h4>
            <p>
              <svg
                width="18px"
                height="18px"
                viewBox="0 0 24 24"
                fill="#fbcd00"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                  fill="#fbcd00"
                />
              </svg>{" "}
              {events? events[itemToShowDetails].starRating : "Fetching..."}/10
            </p>
          </div>
        </div>

        {/* list of all events */}
        { events?
          events.map(({eventName,  date}, index) => {

            return <div className="admin-event" key={index}>
              <img src="/hero.jpg" alt="img" />
              <div className="admin-event-details">
                <h4>{eventName}</h4>
                <div className="admin-event-details-date-cont">
                  <p>
                    <svg
                      style={{ fill: " #8f858" }}
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      viewBox="0 -960 960 960"
                      width="16"
                    >
                      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                    <span>{date}</span>
                  </p>
                  <b
                    onClick={() => {
                      setToggleAdminModal(!toggleAdminModal);
                      setItemToShowDetails(index);
                    }}
                  >
                    view details
                  </b>
                </div>
              </div>
            </div>
          }) : 
          <p>Fetching all events, please wait...</p>
          }
      </div>
    </>
  );
};

export default AllEvents;
