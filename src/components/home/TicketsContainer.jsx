import React, { useEffect, useState, useContext, useCallback } from 'react';
import Ticket from './Ticket';
import { CartContext } from '../../App';

function TicketsContainer({ type }) {
  const { cart } = useContext(CartContext);
 
  const [products, setProducts] = useState([]);

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
     const fdata = [
    {
      id: 1,
      owner: 'Ay',
      eventName: 'AY live show - Lagos',
      noOfGuests: 300,
      flyer: '/hero.jpg',
      date: '2024/5/29',
      price: { regular: '2000', vip: '4000', vvip: '6000', table: '10000' },
      rating: 7,
    },
    {
      id: 2,
      owner: 'Akpororo',
      eventName: 'Night of a thousand laughter',
      noOfGuests: 500,
      flyer: '/hero.jpg',
      date: '2024/7/29',
      price: { regular: '4000', vip: '4000', vvip: '6000', table: '1000000' },
      rating: 8,
    },
  ];

    if (type === "All Events") {
      configureAllEvents(fdata);
    } else {
      configureLatestEvents(fdata);
    }
  }, [type, cart, fdata, configureAllEvents, configureLatestEvents]);

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
      {products.map((each) => (
        <Ticket key={each.id} tickets={each} products={products} />
      ))}
    </div>
  );
}

export default TicketsContainer;
