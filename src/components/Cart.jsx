import React from 'react'
import { useContext, useState } from "react";
import { CartContext } from "../App";
import FetchRequestOptions from './FetchRequestOptions';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';


function Cart() {
  const navigate = useNavigate();
  var {cart, setCart, toggleCart, setToggleCart,total, calcTotal} = useContext(CartContext);
  var [reloadPage, setReloadPage] = useState(false);
  const increment = (id, price) => { 
      var productToInc = cart.find(prod => prod.id === id && prod.price === price)
      if (productToInc) {
        productToInc.qty++
        setReloadPage(!reloadPage)
        calcTotal()
      }
    }        

  const decrement = (id, price) => {
    var productToInc = cart.find(prod => prod.id === id && prod.price === price)
    if (productToInc) {
      productToInc.qty--
      setReloadPage(!reloadPage)
      calcTotal()
    }        
  }
  
  const deleteItem = (id, price) => {
    var updatedCart = cart.filter(prod => {return !(prod.id === id && prod.price === price)})
    setCart(updatedCart)
    calcTotal()
  }

  const clearCart = () => {
    Swal.fire({
      title: "Clear Cart?",
      text: "Are you sure you want to clear all items in cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Clear"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cart cleared!",
          text: "Cart is now empty.",
          icon: "success"
        });
        setCart([])
      }
    });
  }

  const checkout = async () => {
    if (cart.length === 0) {
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
        icon: "error",
        text: 'Cart is empty!',
      });
      return
    }
    var sessionExists = JSON.parse(localStorage.getItem('oseleTicketsUser'))
    if ( sessionExists ) {
      try {
        var newCartData = [cart, sessionExists.user, total]
        var response = await fetch('http://localhost:5000/checkout', FetchRequestOptions('POST', newCartData))
      if (response.status === 200) {
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
          text: 'Ticket(s) purchased successfully!',
        });
      }else{
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
          icon: "error",
          text: 'An error occurred. You might have insufficient funds.',
        });
      }
      } catch (error) {
          alert('An error occurred. Please try again')
          console.log(error)
      }
    
    } else {
      Swal.fire({
        title: "Login needed",
        html: '<p>Oops! you are not logged in. Please login first before purchasing tickets or <b><a href="/signup" style="color: dodgerblue;">sign up</a></b> if you are a new customer.</p>',
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "dodgerblue",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go to login"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    }

    
  }
  
  
  
  

  return (
    <div style={toggleCart? {opacity: '1', zIndex: '4'}: {opacity: '0', zIndex: '-10'}} className='cart-overlay'>
      <div  className='cartCont'>
        <div className="cart-header">
          <p onClick={()=> setToggleCart(!toggleCart)}><svg xmlns="http://www.w3.org/2000/svg" height="27" viewBox="0 -960 960 960" width="27"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></p>
          <h2>Cart</h2>
          <p onClick={clearCart}><svg  xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m634-440-81-80h69l110-200H353l-80-80h525q23 0 35.5 19.5t.5 42.5L692-482q-11 20-28 31t-30 11ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm540 52L566-280H304q-44 0-67-37.5t-3-78.5l42-86-72-162L28-820l56-56L876-84l-56 56ZM486-360l-80-80h-62l-40 80h182Zm136-160h-69 69Zm58 440q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80Z"/></svg></p>
        </div>
        <div className="cart-content">
          {
            cart.map((item, index )=> { 
              return(
                <div key={index} className="cart-row">
                  <img src="/hero.jpg" alt="" />
                  <div className="prod-details">
                    <h3>{item.eventName.length < 28? item.eventName : item.eventName.slice(0, 20) + '...'} </h3>
                    <p style={{fontSize: '0.7em', color: '#9a9898'}}>Price</p>
                    <b style={{color: 'green'}}>N{item.price}</b>
                  </div>
                  <div className="qty-cont">
                    <p onClick={()=> increment(item.id, item.price)}><svg  xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></p>
                    <p className='qty'>{item.qty}</p>
                    <p onClick={()=> decrement(item.id, item.price)}> <svg  xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-440v-80h560v80H200Z"/></svg></p>
                  </div>
                  <p onClick={()=> deleteItem(item.id, item.price)} className='delete'><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></p>
                </div>
              )
             
            })
          }
          
        </div>
        <div className="cart-footer">
          <div className="totalCont">
            <b>Total</b>
            <h3>N<span>{total}</span></h3>
          </div>
          <button onClick={checkout} id='checkoutBtn'>Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
