import  './Home.css'
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../App";

const Navbar = () => {
    var [showMenuBtn, setShowMenuBtn] = useState(false)
    var [displayMenu, setDisplayMenu] = useState(false)
    var {toggleCart, setToggleCart} = useContext(CartContext)
    useEffect(()=> {
        if (window.screen.width > 720) {
            setShowMenuBtn(() => {
                return true
            })
        }
    }, [])


    return (
            <div className='navBg'>
                <nav>
                    <img src="/Osele-logo-w.png" alt="" />
                    <ul className={displayMenu? 'showDropDownMenu' : 'xxx'}>
                        <li><a href="/">Home</a></li>
                        <li><a href="#Latest-events">Latest events</a></li>
                        <li><a href="#events">Events</a></li>
                        <li><a href="#post-event">Post event</a></li>
                    </ul>
                    <div className="nav-login-cont">
                        <div>
                            <p><a href="/login" style={{color: 'white'}}>Login</a></p>
                        </div>
                        <div className="nav-line"></div>
                        <div>
                            <p><a href="/signup" style={{color: 'white'}}>Sign Up</a></p>
                        </div>
                        <div className=" nav-line"></div>
                        <div  onClick={()=> setToggleCart(!toggleCart)}>
                            {showMenuBtn ? 'Cart' :<svg style={{fill: 'white'}} xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/></svg>}
                            
                        </div>
                        <div className=" nav-line" style={showMenuBtn ? {display: 'none'} : {display: 'block'}}></div>
                        <div style={showMenuBtn ? {display: 'none'} : {display: 'block'}} onClick={()=> setDisplayMenu(!displayMenu)}>
                            <svg  style={{fill: 'white'}} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="M666-440 440-666l226-226 226 226-226 226Zm-546-80v-320h320v320H120Zm400 400v-320h320v320H520Zm-400 0v-320h320v320H120Zm80-480h160v-160H200v160Zm467 48 113-113-113-113-113 113 113 113Zm-67 352h160v-160H600v160Zm-400 0h160v-160H200v160Zm160-400Zm194-65ZM360-360Zm240 0Z"/></svg>
                        </div>
                    </div>
                </nav> 
            </div>
            )
}

export default Navbar
