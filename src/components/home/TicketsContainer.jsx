import React from 'react'
import {useEffect, useState, useContext} from 'react'
import Ticket from './Ticket';
import { CartContext } from '../../App'; 
function TicketsContainer({type}) { 
    var {cart} = useContext(CartContext);
  var fdata = [{
    id: 1,
    owner: 'Ay',
    eventName: 'AY live show - Lagos',
    noOfGuests: 300,
    flyer: '/hero.jpg',
    date: '2024/5/29',
    price: {regular: '2000', vip: '4000', vvip: '6000', table: '10000'},
    rating: 7
  },
  {
    id: 2,
    owner: 'Akpororo',
    eventName: 'Night of a thousand laughter',
    noOfGuests: 500,
    flyer: '/hero.jpg',
    date: '2024/7/29',
    price: {regular: '4000', vip: '4000', vvip: '6000', table: '1000000'},
    rating: 8
  }
  ]; 

 

  var [products, setProducts] = useState([]);
 
  
  useEffect(() => {
    if (type === "All Events") {
      configureAllEvents(fdata);
    }else{
      configureLatestEvents(fdata);
    }
    
  }, [cart])

  const configureAllEvents = (receivedData) => {
    setProducts(receivedData)
  }

  const configureLatestEvents = (receivedData) => {
    var latestEvents = []
    receivedData.forEach(each => {
      var currentDatePlus1Month = futureDate(new Date(), 'months', 1)
      var eventDate = new Date(each.date)
      if (currentDatePlus1Month.getTime() > eventDate.getTime()) {
        latestEvents.push(each);
      }
    });
    setProducts(latestEvents);
  }
  
  
 
  function futureDate(date, type, amount) {
    const newDate = new Date(date)
    switch (type) {
      case 'days':
        newDate.setDate(newDate.getDate() + amount);
        break;
      case 'weeks':
        newDate.setDate(newDate.getDate() + (amount * 7));
        break
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
      {
        products.map(each => {
          return <Ticket tickets={each} products={products} />
          
        })
      }
    </div> 
  )
}


export default TicketsContainer
