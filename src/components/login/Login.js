import React, {useState, useContext} from 'react'
import { CartContext } from "../../App";
import './Login.css';
import FetchRequestOptions from '../FetchRequestOptions';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const formData = {
  phone: "",
  password: ""
};


function Login() {
  var {setUserData, setIsLoggedIn} = useContext(CartContext)
  var count = 0
  var [num, setNum] = useState(count);
  const navigate = useNavigate();

  function nextField() {
     setNum(num + 1)
  }

  function prevField() {
    num <= 0 ? setNum(0) : setNum(num - 1)
  }

  
  function extractInput(index,inputValue) {
    
    switch (index) {
      case 1:
        formData.phone = inputValue;
        break;
      case 2:
        formData.password = inputValue;
        break;
    }
  }
  

  function submitForm() {
    //validation for empty fields
    for (const key in formData) {
      if (Object.hasOwnProperty.call(formData, key)) {
        const element = formData[key];
        if (element === "") {
          Swal.fire({
            icon: 'error',
            title: 'Missing details!',
            text: 'You must provide both phone number and password to login!',
            showConfirmButton: true,
            confirmButtonText: 'Back'
          })
          return
        }
      }
    }
    
    //validate phone number
    if (/\s/g.test(formData.phone)) {
      formData.phone = formData.phone.replace(/\s/g, "");
    }

    if (!formData.phone.startsWith(0) || formData.phone.length !== 11) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "invalid phone number format",
        text: "Please use correct format; e.g 090888888XX",
        showConfirmButton: true,
        timer: 5000,
      });
      return;
    }

    //send login request
    fetch('https://osele-tickets-server.onrender.com/login', FetchRequestOptions('POST', formData))
    
    .then(res => res.json()
    .then( res.status === 200 ? indicateLoginSuccess() : indicateLoginFailed())
    )
    .then(data => {
      setUserData(data);
      setIsLoggedIn(true)
      navigate('/dashboard');

      //save user id to browser localStorage 
      localStorage.setItem('oseleTicketsUser', JSON.stringify({user: data.phone}))
    })
    .catch(err => console.error(err))
      function indicateLoginSuccess() {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Welcome!",
          text: "login successful!",
        });
      }


      function indicateLoginFailed() {
        const Toast = Swal.mixin({
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: "Failed!",
          text: "Wrong phone number or password!",
        });
      }

  }

  var Form1 = () => {
    return (
     
          <div className='group'>
            <label htmlFor='fName'>Phone number</label>
            <input onChange={(e) => {extractInput(1, e.target.value)}} type='tel' name='phone' placeholder='e.g 090216489XX' />
            <div className='btnCont'>
              <button type='button' onClick={() => nextField()}>Next</button>
            </div>
          </div>  
    )
  }

  var Form2 = () => {
    return (
     
          <div className='group'>
            <label htmlFor='email'>Password</label>
            <input onChange={(e) => {extractInput(2, e.target.value)}} type='date' name='dob' />
            <div className='btnCont'>
              <button type='button' onClick={() => {prevField()}}>Back</button>
              <button className='submitBtn' type='button' onClick={() => {submitForm()}}>Submit</button>
            </div>
          </div>      
    )
  }

  var fields = [<Form1 />, <Form2 />]

  
  return (
    <div className='formCont'>
      <form className='signup-login-form'>
          <h1>Login Form</h1>
          {fields[num]}
      </form>
    </div>
  )
} 

export default Login
