import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';
import { createContext, useState } from "react";
import Dashboard from './components/dashboard/Dashboard';
import Signup from "./components/signup/Signup";
import Login from './components/login/Login';
export const CartContext = createContext();


function App() {
  var [total, setTotal] = useState(0)
  const [cart, setCart] = useState([]);
  const [toggleCart, setToggleCart] = useState(false);
  const [userData, setUserData] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  const calcTotal = () => {
    var totalPrice = 0
    cart.forEach(item => {
      totalPrice += parseFloat(item.price) * item.qty
    });
    setTotal(totalPrice)
  }
  
  return (
      <CartContext.Provider value={{cart, setCart, toggleCart, setToggleCart, total, setTotal, calcTotal, isLoggedIn, setIsLoggedIn, userData, setUserData}} >
        <Router>
          <Routes>
            {/* Use logical operators to conditionally render routes */}
            {window.location.pathname === '/' && <Route exact path="/" element={<Home />} />}
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={isLoggedIn? <Dashboard /> : <Login />} />
            <Route path="/login" element={<Login />} /> 
            {/* If no routes match, render NotFound component */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      </CartContext.Provider>
  );
}

export default App;
