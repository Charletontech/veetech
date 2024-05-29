import React, { useEffect, useState } from 'react'
import GetRequestOptions from "../GetRequestOptions";

const PostMyEvent = () => {
  var [postMyEventData, setPostMyEventData] = useState(null)
  var [isLoading, setIsLoading] = useState(true)
  var [errorStatus, setErrorStatus] = useState(null)

  useEffect(() => {
    fetch('https://osele-tickets-server.onrender.com/get-all-postmyevent-requests', GetRequestOptions('GET'))
    .then(res => res.json())
    .then(data => {
      setPostMyEventData(data)
      setIsLoading(false)
    })
    .catch(err => {
      setIsLoading(false)
      setErrorStatus(err)
    })
  }, [setIsLoading, setPostMyEventData, setErrorStatus])

  function finishedLoading() {
    if (postMyEventData) {
    return  postMyEventData.map( (each, index) => {
      return <div className="post-my-event-cont" key={index}>
        <img src={each.flyer} alt="img" />
                <h3 style={{textTransform: 'capitalize'}}>{each.eventName}</h3>
        <div className="post-my-event-details">
            <div>
                <p>Organizer</p>
                <h4>{each.organizer}</h4>

                <p>Date</p>
                <h4>{each.date}</h4>

                <p>Location</p>
                <h4>{each.venue}</h4>
            </div>
            <div>
                <p>Number of guests</p>
                <h4>{each.noOfGuests}</h4>

                <p>Ticket price</p>
                <h4>{each.price}</h4>

                <p>Organizer email</p>
                <h4>{each.email}</h4>
            </div>
        </div>
    </div>
      })
    } else {
      return <p>An error ocurred: {errorStatus}</p>
    }
  }

  
  return (
    <>
      <div className="admin-content-area" id='post-my-event'>
        {
          isLoading? <p>Fetching data...</p> : finishedLoading()
        }
      

      </div>
    </>
  )
}

export default PostMyEvent
