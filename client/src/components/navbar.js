import React from 'react'
import '../App.css'
import { Link } from "react-router-dom";

export default function NavBar(props){
    return(
        <nav>
            <ul className="navbar">
                <li><Link to="/" className="navLink">
                    <p name="next" variant="outlined"> Home </p>
                </Link></li>
                <li><Link to="/Campaigns" className="navLink">
                    <p name="next" variant="outlined"> Campaigns </p>
                </Link></li>
            </ul>
        </nav>
    )
}