import React, {useState} from 'react'
import './Signup.css'
import FetchRequestOptions from '../FetchRequestOptions';
import Swal from 'sweetalert2';

const formData = {
  fName: "",
  phone: "",
  email: "",
  dob: "",
  gender: "male",
  type: "customer"
  // password:''
};

const Signup = () => {
  var count = 0
  var [num, setNum] = useState(count)
 
 
  function nextField() {
     setNum(num + 1)
  }

  function prevField() {
    num <= 0 ? setNum(0) : setNum(num - 1)
  }

  

  function extractInput(index,inputValue) {
    
    switch (index) {
      case 1:
        formData.fName = inputValue
        break;
      case 2:
        formData.phone = inputValue
        break;

      case 3:
        formData.email = inputValue
        break;

      case 4:
        formData.dob = inputValue
        break;

      case 5:
        formData.gender = inputValue
        break;

      case 6:
        formData.type = inputValue
        break;
      default:
          break
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
            title: 'Empty fields found!',
            text: 'Form fields cannot be left empty. Please fill in all fields in the form.',
            showConfirmButton: true,
            confirmButtonText: 'Complete form'
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

    //validate dob
    var year = new Date(formData.dob).getFullYear();
    if (year > 2005) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "Age is too young, must be at least 18 years to sign up. Kindly change the date of birth.",
        showConfirmButton: true,
        timer: 5000,
      });

      return;
    }

    //validate full name
    if (/[,./'-]/.test(formData.fName)) {
      formData.fName = formData.fName.replace(/[,./'-]/g, "");
    }
    var fulName = formData.fName.split(" ");
    if (fulName.length < 3) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "Wrong name format. Name must have: First name, Middle name and Last name separated by single spaces. e.g Okoro Charles Olamide",
        showConfirmButton: true,
        timer: 5000,
      });
      return;
    }

    function indicateSignupSuccess() {
      nextField()
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: true,
        timer: 10000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Welcome!",
        text: "You have been successfully signed up. You may now proceed to login. Your date of birth is your password.",
      });
    }
    
    fetch('https://osele-tickets-server.onrender.com/signup', FetchRequestOptions('POST', formData))
    .then(res => res.ok ? indicateSignupSuccess() : alert('Failed'))
    .catch(err => console.error(err))
  }
  


  var Form1 = () => {
    return (
     
          <div className='group'>
            <label htmlFor='fName'>Full Name</label>
            <input onChange={(e) => {extractInput(1, e.target.value)}} type='text' name='fName' placeholder='e.g John Doe James' />
            <div className='btnCont'>
              <button type='button' onClick={() => nextField()}>Next</button>
            </div>
          </div>  
    )
  }


  var Form2 = () => {
    return (
          <div className='group'>
            <label htmlFor='pWord'>Phone Number</label>
            <input onChange={(e) => {extractInput(2, e.target.value)}} type='tel' name='phone' placeholder='e.g 08056793XXX' />
            <div className='btnCont'>
              <button type='button' onClick={() => {prevField()}}>Back</button>
              <button type='button' onClick={() => nextField()}>Next</button>
            </div>
          </div>
      
    )
  }

  

  var Form3 = () => {
    return (
     
          <div className='group'>
            <label htmlFor='email'>Email</label>
            <input onChange={(e) => {extractInput(3, e.target.value)}} type='email' name='email' placeholder='e.g Johndoe@mail.com' />
            <div className='btnCont'>
              <button type='button' onClick={() => {prevField()}}>Back</button>
              <button type='button' onClick={() => nextField()}>Next</button>
            </div>
          </div>      
    )
  }


  
  var Form4 = () => {
    return (
     
          <div className='group'>
            <label htmlFor='email'>Date of Birth</label>
            <input onChange={(e) => {extractInput(4, e.target.value)}} type='date' name='dob' />
            <div className='btnCont'>
              <button type='button' onClick={() => {prevField()}}>Back</button>
              <button type='button' onClick={() => nextField()}>Next</button>
            </div>
          </div>      
    )
  }


  var Form5 = () => {
    return (
     
          <div className='group'>
            <label htmlFor='email'>Gender</label>
            <select name='gender'  onChange={(e) => {extractInput(5, e.target.value)}}>
              <option value={'male'}>Male</option>
              <option value={'female'}>Female</option>
            </select>
            <div className='btnCont'>
              <button type='button' onClick={() => {prevField()}}>Back</button>
              <button type='button' onClick={() => nextField()}>Next</button>
            </div>
          </div>      
    )
  }


  var Form6 = () => {
    return (
     
          <div className='group'>
            <label htmlFor='email'>Sign up as:</label>
            <select name='gender'  onChange={(e) => {extractInput(6, e.target.value)}}>
              <option value={'Customer'}>Customer</option>
              <option value={'Reseller'}>Reseller</option>
            </select>
            <div className='btnCont'>
              <button type='button' onClick={() => {prevField()}}>Back</button>
              <button className='submitBtn' type='button' onClick={() => {submitForm()}}>Submit</button>
            </div>
          </div>      
    )
  }

  


  // var Form3 = () => {
  //   return (
  //         <div className='group'>
  //           <label htmlFor='pWord'>Password</label>
  //           <input onChange={(e) => {extractInput(2, e.target.value)}} type='pWord' name='pWord' placeholder='John Doe' />
  //           <div className='btnCont'>
  //             <button type='button' onClick={() => {prevField()}}>Back</button>
  //             <button className='submitBtn' type='button' onClick={() => {submitForm()}}>Submit</button>
  //           </div>
  //         </div>
      
  //   )
  // }

  var fields = [<Form1 />, <Form2 />, <Form3 />, <Form4 />, <Form5 />, <Form6 /> ]


  return (
    <div className='formCont'>
      <form className='signup-login-form'>
       {num > 5 ?  <h1>&nbsp;</h1> :  <h1>Signup Form</h1>}
        {num > 5 ?
         <h1>Signup Success!</h1> : 
         fields[num]
         }
        
      </form>
    </div>
  )
}

export default Signup
