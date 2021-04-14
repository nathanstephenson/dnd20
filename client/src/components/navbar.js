import React from 'react'
import '../App.css'
import { Link } from "react-router-dom";

export default function NavBar(props){

    const current = window.location.pathname
    
    var home = <Link to="/"  className="navLink-home">
            <h3> DND20 </h3>
        </Link>
    var campaigns =  <Link to="/Campaigns" className="navLink">
            <p> Campaigns </p>
        </Link>
    var characters = <Link to="/Characters" className="navLink">
            <p> Characters </p>
        </Link>
    var play = <Link className="navLink">
            <p> Play </p>
        </Link>
    var account = <Link className="navLink">
            <p> My Account </p>
        </Link>
    var links = [home, campaigns, characters, play, account]

    //maybe set current page's link's background to different colour

    return(
        <nav className="navbar">
            {links}
        </nav>
    )
}