import React from 'react';
import {useState} from 'react';
import '../App.css';
import { Link } from "react-router-dom";



function Register() {

	const [buttonText, setButtonText] = useState("Next");

	return(//obviously needs more added
		<header className="App-header">
			<img src="images/Nooth_DnD.png" width='300' alt="logo" onClick={() => setButtonText("baba")}/>
			<h1 className="title">
				Sign Up
			</h1>
			<form className="Form">
				<label htmlFor="fullname" className="tbLabel">Full Name: </label>
				<input type="name" id="fullname" name="fullname"/><br/>
				<label htmlFor="email" className="tbLabel" name="tbLabel">Email: </label>
				<input type="email" id="email" name="email"/><br/>
				<label htmlFor="username" className="tbLabel" name="tbLabel">Username: </label>
				<input type="text" id="username" name="username"/><br/>
				<label htmlFor="password" className="tbLabel" name="tbLabel">Password: </label>
				<input type="password" id="password" name="password"/><br/>
			</form><br/>
			<button name="submit">
				Submit
			</button><br/>
			<button name="next" variant="outlined">
				<Link to="/SomePage">
					{buttonText}
				</Link>
			</button>
		</header>
		)
}

export default Register;