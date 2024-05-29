
const TicketsSold = ({ticketsSold}) => {
 
  return (
    <>
      <div className="admin-content-area" id='tickets-sold'>
        <table>
            <thead>
              <tr>
                  <th>Event code</th>
                  <th>Ticket id</th>
                  <th>Quantity</th>
                  <th>Phone</th>
                  <th>Event</th>
                  <th>Price</th>
                  <th>Date Purchased</th>
              </tr>
            </thead>
            <tbody>
              { ticketsSold? 
                ticketsSold.map((each, index) => {
                  return  <tr key={index}>
                      <td>#{each.eventCode}</td>
                      <td>#{each.ticketId}</td>
                      <td>{each.qty}</td>
                      <td>{each.phone}</td>
                      <td>{each.eventName}</td>
                      <td>{each.price}</td>
                      <td>{each.datePurchased}</td>
                  </tr>
                }) : <p>Fetching data, Please wait...</p>
              }
            </tbody>
        </table>
      </div>
    </>
  )
}

export default TicketsSold
