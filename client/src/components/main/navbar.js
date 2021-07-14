import React, { useState } from 'react'
import '../../App.css'
import { Link } from "react-router-dom";

export default function NavBar(props){

    const current = window.location.pathname

    const [night, toggleNight] = useState(false)
    const [buttonText, changeButtonText] = useState("D")
    const style = document.querySelector(':root').style
    var toggleNightMode = <span className="nav-button"><button onClick={()=>{
        if(night){
            style.setProperty('--bg-primary', 'var(--bg-day)')
            style.setProperty('--navTextColour', '#e6e6e6')
            toggleNight(false)
            changeButtonText("D")
        }else{
            style.setProperty('--bg-primary', 'var(--bg-night)')
            style.setProperty('--navTextColour', '#e6e6e6')
            toggleNight(true)
            changeButtonText("N")
        }
    }} className="nav-link">{buttonText}</button></span>
    
    var home = <li className="nav-title"><Link to="/" className="nav-link">
            <span className="nav-title-text"> DND20 </span>
        </Link></li>
    var campaigns =  <li className="nav-item"><Link to="/Campaigns" className="nav-link">
            <span className="nav-text"> Campaigns </span>
        </Link></li>
    var characters = <li className="nav-item"><Link to="/Characters" className="nav-link">
            <span className="nav-text"> Characters </span>
        </Link></li>
    var play = <li className="nav-item"><Link to="/Play" className="nav-link">
           <span className="nav-text"> Play </span>
        </Link></li>
    var account = <li className="nav-item"><Link to="/MyAccount" className="nav-link">
            <span className="nav-text"> My Account </span>
        </Link></li>
    var links = [home, campaigns, characters, play, account, toggleNightMode]

    //maybe set current page's link's background to different colour

    return(
        <nav className="navbar">
            <ul className="navbar-nav">{links}</ul>
        </nav>
    )
}