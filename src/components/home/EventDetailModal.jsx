import React, {useState} from 'react'

const EventDetailModal = ({tickets, setDisplayEventDetailsModal, displayEventDetailsModal}) => {
  var [seeMore, setSeeMore] = useState(false);
  return (
    <div className="homeEventDetailModal">
      <div className="homeEventDetailsCont">
        <div className="modalSideA">
          <img src={tickets.flyer} id='homeModalImg' alt="img" />
          <p className='closeHomeModal' onClick={()=> setDisplayEventDetailsModal(!displayEventDetailsModal)}><svg xmlns="http://www.w3.org/2000/svg" height="27" viewBox="0 -960 960 960" width="27"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></p>
          <h4>{tickets.eventName}</h4>
        </div>

        <div className='modalSideB' style={seeMore? {transform: "translateY(-50vh)"} : {transform: "translateY(0)", transition: "0.5s ease-in"}}>
          <div className="see-more-cont" onClick={() => setSeeMore(!seeMore)}>
            <p style={{marginBottom: '0.35rem'}}>{seeMore? "See less" : " See details"}</p>
          { seeMore? 
            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" ><path d="m480-340 180-180-57-56-123 123-123-123-57 56 180 180Zm0 260q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" ><path d="m357-384 123-123 123 123 57-56-180-180-180 180 57 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
          }
          </div>

          <article>
          <h4>Description</h4>
          <p>{tickets.description}</p>
          </article>

          <article>
          <h4>Date</h4>
          <p>{tickets.date}</p>
          </article>

          <article>
          <h4>Venue</h4>
          <p>{tickets.location}</p>
          </article>

          <article>
          <h4>Maximum Capacity</h4>
          <p>{tickets.noOfGuests} guests</p>
          </article>

          <article>
          <h4>Organizer</h4>
          <p>{tickets.organizer}</p>
          </article>
        </div>
      </div>
    </div>
  )
}


export default EventDetailModal
