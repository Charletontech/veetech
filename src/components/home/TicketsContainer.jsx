import React, { useEffect, useState, useContext, useCallback } from 'react';
import Ticket from './Ticket';
import { CartContext } from '../../App';
import GetRequestOptions from "../GetRequestOptions";

function TicketsContainer({ type }) {
  const { cart } = useContext(CartContext);
  
  const [products, setProducts] = useState(null);

  const configureAllEvents = useCallback((receivedData) => {
    setProducts(receivedData);
  }, []);

  const configureLatestEvents = useCallback((receivedData) => {
    const latestEvents = receivedData.filter((each) => {
      const currentDatePlus1Month = futureDate(new Date(), 'months', 1);
      const eventDate = new Date(each.date);
      return currentDatePlus1Month.getTime() > eventDate.getTime();
    });
    setProducts(latestEvents);
  }, []);

  useEffect(() => {
    // const fdata = [
      //   {
        //     id: 1,
        //     organizer: 'Ay',
        //     eventName: 'AY live show - Lagos',
        //     noOfGuests: 300,
        //     flyer: '/hero.jpg',
        //     date: '2024/5/29',
        //     price: { regular: '2000', vip: '4000', vvip: '6000', table: '10000' },
        //     rating: 7,
        //   }]
        
    fetch('https://osele-tickets-server.onrender.com/get-all-events', GetRequestOptions("GET"))
    .then(res => res.text())
    .then(data => {
      if (type === "All Events") {
        configureAllEvents(JSON.parse(data));
      } else {
        configureLatestEvents(JSON.parse(data));
      }
      // console.log(data)
    })
    
  }, [type, cart,  configureAllEvents, configureLatestEvents]);

  function futureDate(date, type, amount) {
    const newDate = new Date(date);
    switch (type) {
      case 'days':
        newDate.setDate(newDate.getDate() + amount);
        break;
      case 'weeks':
        newDate.setDate(newDate.getDate() + amount * 7);
        break;
      case 'months':
        newDate.setMonth(newDate.getMonth() + amount);
        break;
      default:
        break;
    }
    return newDate;
  }

  return (
    <div className='ticketsContainer'>
      
      {products? 
        products.map((each) => (
          <Ticket key={each.id} tickets={each} products={products} />
        )) : 
        "fetching data..."
      }
    </div>
  );
}

export default TicketsContainer;
