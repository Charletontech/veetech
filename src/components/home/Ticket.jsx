import React from 'react'
import { useState, useContext} from 'react'
import { CartContext } from '../../App'; 
import Swal from "sweetalert2";
import EventDetailModal from './EventDetailModal';

function Ticket({tickets, products}) {
    var {cart, setCart, calcTotal} = useContext(CartContext);
    var [showTicketTypes, setShowTicketTypes] = useState(false);
    var [reloadPage, setReloadPage] = useState(false);
    var [displayEventDetailsModal, setDisplayEventDetailsModal] = useState(false)

    const displayEventDetail = () => {
      setDisplayEventDetailsModal(!displayEventDetailsModal)
    }
    

    const addToCart = (prodId, price) => {
        let itemExists = cart.find( product => product.id === prodId && product.price === price) 
        if (itemExists) {
          Swal.fire({
            position: "center",
            icon: "info",
            text: 'Ticket already in cart!',
            showConfirmButton: false,
            timer: 1500
          });
          return
        } else {
          const productToAdd =  products.find(product => product.id === prodId);
          if (productToAdd) {
            productToAdd.price = price;
            productToAdd.qty = 1
            setCart(prevCart => [...prevCart, productToAdd]);
            setReloadPage(!reloadPage)
            const Toast = Swal.mixin({
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              text: "Ticket added to cart",
            });
          }
          calcTotal()
        }
      };
      calcTotal()
  return (
    <div className="eventCont" key={tickets.id}>
        { displayEventDetailsModal? <EventDetailModal tickets={tickets} setDisplayEventDetailsModal={setDisplayEventDetailsModal} displayEventDetailsModal={displayEventDetailsModal} /> : <span></span>}
        <img src={products? tickets.flyer : ""} alt="img" onClick={ () => {displayEventDetail(tickets)}}/>
        <div className="cartIcon-ticketType-cont">
        <div className={"ticketType" + (showTicketTypes ? " showTicket" : "")} >
            <div className="ticket" onClick={products? () => addToCart(tickets.id, JSON.parse(tickets.ticketPrices)[0].regular) : alert('loading tickets')}>
            <div className='ticketTypeName'><p><svg style={{ fill: "black" }}  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm0-160q17 0 28.5-11.5T520-480q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480q0 17 11.5 28.5T480-440Zm0-160q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm320 440H160q-33 0-56.5-23.5T80-240v-160q33 0 56.5-23.5T160-480q0-33-23.5-56.5T80-560v-160q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v160q-33 0-56.5 23.5T800-480q0 33 23.5 56.5T880-400v160q0 33-23.5 56.5T800-160Zm0-80v-102q-37-22-58.5-58.5T720-480q0-43 21.5-79.5T800-618v-102H160v102q37 22 58.5 58.5T240-480q0 43-21.5 79.5T160-342v102h640ZM480-480Z"/></svg></p><b>Regular</b></div>
            <button>N{products? JSON.parse(tickets.ticketPrices)[0].regular : "Loading..."}</button>
            </div>
            <div className="ticket" onClick={products? () => addToCart(tickets.id, JSON.parse(tickets.ticketPrices)[0].vip) : alert('loading tickets')}>
            <div className='ticketTypeName'><p><svg style={{ fill: "black" }}  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm0-160q17 0 28.5-11.5T520-480q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480q0 17 11.5 28.5T480-440Zm0-160q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm320 440H160q-33 0-56.5-23.5T80-240v-160q33 0 56.5-23.5T160-480q0-33-23.5-56.5T80-560v-160q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v160q-33 0-56.5 23.5T800-480q0 33 23.5 56.5T880-400v160q0 33-23.5 56.5T800-160Zm0-80v-102q-37-22-58.5-58.5T720-480q0-43 21.5-79.5T800-618v-102H160v102q37 22 58.5 58.5T240-480q0 43-21.5 79.5T160-342v102h640ZM480-480Z"/></svg></p><b>VIP</b></div>
            <button>N{products? JSON.parse(tickets.ticketPrices)[0].vip : "Loading..."}</button>
            </div>
            <div className="ticket" onClick={products? () => addToCart(tickets.id, JSON.parse(tickets.ticketPrices)[0].vvip) : alert('loading tickets')}>
            <div className='ticketTypeName'><p><svg style={{ fill: "black" }}  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm0-160q17 0 28.5-11.5T520-480q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480q0 17 11.5 28.5T480-440Zm0-160q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm320 440H160q-33 0-56.5-23.5T80-240v-160q33 0 56.5-23.5T160-480q0-33-23.5-56.5T80-560v-160q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v160q-33 0-56.5 23.5T800-480q0 33 23.5 56.5T880-400v160q0 33-23.5 56.5T800-160Zm0-80v-102q-37-22-58.5-58.5T720-480q0-43 21.5-79.5T800-618v-102H160v102q37 22 58.5 58.5T240-480q0 43-21.5 79.5T160-342v102h640ZM480-480Z"/></svg></p><b>VVIP</b></div>
            <button>N{products? JSON.parse(tickets.ticketPrices)[0].vvip : "Loading..."}</button>
            </div>
            <div className="ticket" onClick={products? () => addToCart(tickets.id, JSON.parse(tickets.ticketPrices)[0].table) : alert('loading tickets')}>
            <div className='ticketTypeName'><p><svg style={{ fill: "black" }}  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm0-160q17 0 28.5-11.5T520-480q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480q0 17 11.5 28.5T480-440Zm0-160q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm320 440H160q-33 0-56.5-23.5T80-240v-160q33 0 56.5-23.5T160-480q0-33-23.5-56.5T80-560v-160q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v160q-33 0-56.5 23.5T800-480q0 33 23.5 56.5T880-400v160q0 33-23.5 56.5T800-160Zm0-80v-102q-37-22-58.5-58.5T720-480q0-43 21.5-79.5T800-618v-102H160v102q37 22 58.5 58.5T240-480q0 43-21.5 79.5T160-342v102h640ZM480-480Z"/></svg></p><b>Table</b></div>
            <button>N{products? JSON.parse(tickets.ticketPrices)[0].table : "Loading..."}</button>
            </div>
        </div>
       
        <p className='cartIcon'  onClick={()=> setShowTicketTypes(!showTicketTypes)}>
            <svg width="18px" height="18px" viewBox="0 0 1024 1024" fill="#000000" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M800.8 952c-31.2 0-56-24.8-56-56s24.8-56 56-56 56 24.8 56 56-25.6 56-56 56z m-448 0c-31.2 0-56-24.8-56-56s24.8-56 56-56 56 24.8 56 56-25.6 56-56 56zM344 792c-42.4 0-79.2-33.6-84-76l-54.4-382.4-31.2-178.4c-2.4-19.2-19.2-35.2-37.6-35.2H96c-13.6 0-24-10.4-24-24s10.4-24 24-24h40.8c42.4 0 80 33.6 85.6 76l31.2 178.4 54.4 383.2C309.6 728 326.4 744 344 744h520c13.6 0 24 10.4 24 24s-10.4 24-24 24H344z m40-128c-12.8 0-23.2-9.6-24-22.4-0.8-6.4 1.6-12.8 5.6-17.6s10.4-8 16-8l434.4-32c19.2 0 36-15.2 38.4-33.6l50.4-288c1.6-13.6-2.4-28-10.4-36.8-5.6-6.4-12.8-9.6-21.6-9.6H320c-13.6 0-24-10.4-24-24s10.4-24 24-24h554.4c22.4 0 42.4 9.6 57.6 25.6 16.8 19.2 24.8 47.2 21.6 75.2l-50.4 288c-4.8 41.6-42.4 74.4-84 74.4l-432 32c-1.6 0.8-2.4 0.8-3.2 0.8z" fill="" /></svg>
            {/* <img style={{width: '20px', height: '20px'}} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEi0lEQVR4nO2dS4hdRRCGvxlH46hBJszowhfEB8HBwaAYFYRsdHxmIUQFIeShKKIrF0aCKCJRcSIo+IjRhaNuVCISMYoKupCI0SgJPhYaERFnY4aIGJ/T0tBCCDi37jk33VV964N/m/vXqTM3XdXVfcFxHMdxHMdxHKc89wCbD9JzwMsC3VjaeK18DoQG+h44orT5GtnVMCFR15Q2XyOftkjI9tLma+STFgmZA84qHUBt7GyRkKhNpQOojY9bJmQWOLZ0EDXxUcuERK0rHURNPA68c4i2HlRvvC5IyG5gZR9qBbDY2tK4ds2lF3gkZ0JuUhB4UK53cybkGGCfgqCDcl2SMymPKgg4KNedORNyZvq+LB10UKxbyczbCoIOSvU3cFruhKxQEHhQqmcpwCDwnYLggzL9BpxCIe4WGJyiDsaA/YJ47ytpchQ4IOhvxaWydZ4UJGMGWFja6AsCo2uwzRLgT0GcsWguzkUCo7HdYpltghi/AIYwtLG1DJssF/5nPoki1gkMP489BoUv23soYxj4uYPp34ETsMUqQTL+AZaiEEl/6y7sMJzGm1QWgRJOT29LLfNbG4RF4Mko5i1BEFejnzELRWCv+lsW5reeslIESlYle43Pby0B/qppmMN6f2ubtSKw5v7WckEy1BWBvepvrUUXg1aLQAkXCgL7DF2sslwE1tbfGhYWgVswjKS/NY0ONtRQBNbS3xoTFoH3UgGbBIGuN1AE/ljLVL9kfisOSpxXSFcIi0AVO4E5+1tBsXYbaoj2xfzWJJUh6W8FpbLQCG3ElIKHGxqMg55DhYykVnUwpikq5WkFDzd0qTeBI6mQZYJtXU2aAx6rNRkxqD0KHnIQKG4HPANMUDGSjaqoOwoWhhOpPzVA5cTDKr8KkhGLRicDbwi7p3F0yDnMXC/8qopfac5hZkhYle+pdSWjjcsFyYjL4ItLG+0XHhEkJBaKTia2dkjGT7nvAel3Og2Z/ZAm4GvQKAbYoqDqDpk0jgH66aagcQwwmgq+0g8reEJsb0aFWv9CSOMyVrq8oR8SEjmpB1fOBuUylZDI0elSzU5HE6xqHKOMptvVXksD2LVocekH6ziO4zi5OQN4MP16z2xade1Nl9FMKtvLmU7eDqS7ieOxu421bDUPpf2RThd/vV/yjkLgVOCDDh7/AB62dBT6UI7q8hjCDHB2AZ/jXY65bre69dxkfPQb4PiMHuNnfdvA5xMY4/wWt15vzOjzoYYe59KQnRlebNGO2A8syOAxfsYvLXxqOT0sOpwz27JHdGkGn5e19LjPyvjpiS0DDcBtGXze3gOf8Ti1iZqjbaDrFQ2Cz6cYq3oW9iDQ1Rl8ru2Bz+MwwtcG9hkmWnr8EkM80CLQr4y8OPdjiBHBHSf/p5UZfd7Q0GNcRS7CGNc2KA5fybyUjJ/1UpceY0zXYZRbhL8oEPVquj0oN8OCeeT/FGO5GePEm+V2zBPkTPrxrIGCHgdS7TNfk/FD4AIqYmla+29ObYe4P3JlpjZJN1MyV6Ue13TyGj2fK/4XHMdxHMdxHMdxsMW/wFSv7rg6kxcAAAAASUVORK5CYII="></img> */}
        </p>
        </div>
        
        <div className="starCont">
            <p> {products? tickets.starRating : "Loading..."}/10</p>
            <svg  width="18px" height="18px" viewBox="0 0 24 24" fill="#fbcd00" xmlns="http://www.w3.org/2000/svg"><path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#fbcd00"/></svg>
            {/* <svg style={{fill: '#fbcd00'}} xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#fbcd00"><path d="m384-334 96-74 96 74-36-122 90-64H518l-38-124-38 124H330l90 64-36 122ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Zm247-369Z"/></svg> */}
        </div>
        <h4>{products? tickets.eventName : "Loading..."}</h4>
    </div>
  )
}

export default Ticket
