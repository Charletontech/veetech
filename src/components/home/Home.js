import Cart from "../Cart"
import Heading from "./Heading"
import Navbar from "./Navbar"
import TicketsContainer from "./TicketsContainer"
import Swal from "sweetalert2";
import GetRequestOptions from "../GetRequestOptions";

const Home = () => {
    var formData = new FormData();
    formData.append('organizer', "");
    formData.append('eventName', "");
    formData.append('noOfGuests', "");
    formData.append('flyer', "");
    formData.append('date', "");
    formData.append('price', "");
    formData.append('venue', "");
    formData.append('email', "");

    const initDB = () => {
        fetch('http://localhost:5000/db-init', GetRequestOptions('GET'))
        .then(res => res.json())
        .then(data => alert(data.message))
        .catch(err => alert(err))
      }
    
    const handleForm = (e) => {
        switch (e.target.name) {
            case 'organizer':
                formData.set('organizer', `${e.target.value}`);
                break;
            case 'eventName':
                formData.set('eventName', `${e.target.value}`);
                break;
            case 'noOfGuests':
                formData.set('noOfGuests', `${e.target.value}`);
                break;
            case 'flyer':
                formData.set('flyer', e.target.files[0]);               
                break;
            case 'date':
                formData.set('date', `${e.target.value}`);               
                break;
            case 'price':
                formData.set('price', `${e.target.value}`);
                break;
            case 'venue':
                formData.set('venue', `${e.target.value}`);
                break;
            case 'email':
                formData.set('email', `${e.target.value}`);
                break;
        
            default:
                break;
        }
    }

    const submitForm = (e) => {
      e.preventDefault()
    }

    const animateSubmitBtn = async (e) => {
        // animate submit button
        e.target.innerHTML = 'Sending request...'
        e.target.style.transition = 'all 0.3s'
        e.target.addEventListener('mousedown',  ()=> {
            e.target.style.transform = 'scale(0.8)'
            e.target.style.background = 'white'
        })
        e.target.addEventListener('mouseup', ()=> {
            e.target.style.transform = 'scale(1)'
            e.target.style.background = '#f6006d'
        })

               
        // submit form
        try {
            const fetchOptions = (METHOD, BODY) => {
                var options = {
                    method: `${METHOD}`,
                    headers: new Headers({
                        'Authorization': `Bearer 123`,
                    }),
                    body: BODY
                }
                return options
            }
            var response = await fetch('https://osele-tickets-server.onrender.com/post-event-request', fetchOptions('POST', formData));
            if (response.status === 200) {
                e.target.innerHTML = "Submit"
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top",
                    showConfirmButton: true,
                    timer: 8000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "success",
                    title: "Sent!",
                    text: "Your event has been sent to us. We will reach out to you via your mail soon.",
                  });
            } else {
                e.target.innerHTML = "Submit"
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top",
                    showConfirmButton: true,
                    timer: 8000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "error",
                    title: "Oops!",
                    text: "An error occurred. Your event was unable to be sent. Please try again.",
                  }); 
            }
        } catch (error) {
            e.target.innerHTML = "Submit"
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: true,
                timer: 8000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: "Oops!",
                text: "An error occurred. Your event was unable to be sent. Please try again.",
              }); 
            console.log("Error message: ", error)
        }
        
    }

    return(
        <>
            <section id="homeLanding">
                <Navbar/>
                <Cart />
                <div className="homeCont">
                    <div className="sideA">
                       <div className="blur">
                        <h1>Get Event</h1>
                            <h1 style={{color: '#fbcd00', textShadow: '0 0px 5px #986800c7'}}>Tickets</h1>
                            <p>Post events, purchase event tickets,
                                sell event tickets, all in one place....Osele tickets!
                            </p>
                            <button>Buy Ticket</button>
                       </div>
                    </div>

                    <div className="sideB"></div>
                </div>
            </section>
            <div className="searchCont">
                <div>
                    <p>Search</p>
                </div>
                <input type="search" placeholder="Type event name..." />
            </div>
            
            <section id="Latest-events">
                <Heading title={"Latest Events"} />
                <TicketsContainer type={"latest Events"} />
            </section>

            <section id="events">
                <Heading title={"All Events"} />
                <TicketsContainer type={"All Events"} />
            </section>
            <section id="post-event">
            <Heading title={"Post Event"} />
                <div className="post-event-container">
                    <div className="post-event-content">
                        <h1>Our <span>Policy</span></h1>
                        <p>To post an event or sell tickets on <b>Osele Tickets</b>, you will have to complete
                        the form below and submit. Your event details will be reviewed after which we will respond to you through the email you will provide in 
                        the same form. Thanks for choosing <b>Osele Tickets</b>.
                        </p>
                    </div>
                    <div className="eventformCont">
                        <form onSubmit={submitForm} className="eventform">
                            <div className="formGroup">
                                <div>
                                    <label>Event organizer</label>
                                    <input type="text" name="organizer" onChange={handleForm} />
                                </div>
                                <div>
                                    <label>Name of event</label>
                                    <input type="text" name="eventName" onChange={handleForm} />
                                </div>
                                <div>
                                    <label>Event date</label>
                                    <input type="date" name="date" onChange={handleForm} />
                                </div>
                                <div>
                                    <label>Venue of event</label>
                                    <input type="text" name="venue" onChange={handleForm} />
                                </div>
                                <button onClick={animateSubmitBtn} className="submitBtn" type="submit">Submit</button>
                            </div>
                
                            <div className="formGroup">
                                <div>
                                    <label>Organizer contact email</label>
                                    <input type="email" name="email" onChange={handleForm}/>
                                </div>
                                <div>
                                    <label>Number of guests</label>
                                    <input type="number" name="noOfGuests" onChange={handleForm}/>
                                </div>
                                <div>
                                    <label>Event flyer</label>
                                    <input type="file" name="flyer" onChange={handleForm} style={{padding: '8px'}} />
                                </div>
                                <div>
                                    <label>Ticket price</label>
                                    <input type="number" placeholder="N" name="price" onChange={handleForm} />
                                </div>
                            </div>
                           
                        </form>
                    </div>                                              
                </div>
            </section>

            <footer>
                    <div className="footerGenCont">
                        <img src="/osele-logo-w.png" alt="img" />
                        <div className="footerCont">
                            <div className="footer-column">
                                <h4>Contact Us</h4>
                                <p>0900000000</p>
                                <p>info@oseletickets.com.ng</p>
                                <p>+2349000000000</p>
                            </div>
                            <div className="footer-column">
                                <h4 onClick={initDB}>Site Map</h4>
                                <p><a href="#events">Buy tickets</a></p>
                                <p><a href="#events">Latest events</a></p>
                                <p><a href="#events">Post event</a></p>
                            </div>
                            <div className="footer-column">
                                <h4>Links</h4>
                                <p><a href="#homeLanding">Home</a></p>
                                <p><a href="/signup">Sign up</a></p>
                                <p><a href="/login">Log in</a></p>
                            </div>
                        </div>
                    </div>
            </footer>
        </>
    )
}


export default Home
