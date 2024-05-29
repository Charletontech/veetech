import React from 'react'
import FetchRequestOptions from '../FetchRequestOptions';

const TicketSalesSpreadsheet = ({events}) => {

    // logic to download CSV file
    function downloadEventDetails(e, eventCode) {
        e.target.innerText = "Downloading..."
        fetch('https://osele-tickets-server.onrender.com/download-event-spreadsheet', FetchRequestOptions('POST', {eventCode: eventCode}))
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `event_${eventCode}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            e.target.innerText = "Download";
        })
        .catch(err => {
            console.error("Error occurred while downloading CSV file: ", err);
            e.target.innerText = "Download";
        });
    }

  return (
    <>
        <div className="admin-content-area" id='all-customers-cont'>
            <table>
                <thead>
                    <tr>
                        <th>Event code</th>
                        <th>Event</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        events?
                        events.map(({eventCode, eventName}, index) => {
                            return <tr key={index}>
                                <td>#{eventCode}</td>
                                <td>{eventName}</td>
                                <td><button onClick={(e) => {downloadEventDetails(e, eventCode)}}>Download</button></td>
                            </tr>
                        }) : <p>Fetching data...</p>
                        
                    }
                </tbody>

            </table>
        </div>
    </>
  )
}

export default TicketSalesSpreadsheet
