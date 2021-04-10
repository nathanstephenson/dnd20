import React from 'react'
import '../App.css'
import { Link } from "react-router-dom";

export default function NavBar(props){
    return(
        <nav>
            <ul className="navbar">
                <li><Link to="/" className="navLink-home">
                    <h3 name="next" variant="outlined"> DND20 </h3>
                </Link></li>
                <li><Link to="/Campaigns" className="navLink">
                    <p name="next" variant="outlined"> Campaigns </p>
                </Link></li>
                <li><Link className="navLink">
                    <p name="next" variant="outlined"> Characters </p>
                </Link></li>
                <li><Link className="navLink">
                    <p name="next" variant="outlined"> Play </p>
                </Link></li>
            </ul>
        </nav>
    )
}