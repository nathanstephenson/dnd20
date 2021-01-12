import React from 'react';
import {useState} from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import Login from "../components/Login";



function Home() {

	const [buttonText, setButtonText] = useState("Next");

	return(
		<header className="App-header">
			<img src="images/Nooth_DnD.png" className="App-logo" alt="logo" />
			<h1 className="title">
				DnD20
			</h1>
			<Login />
			<button name="showpong" onClick={() => setButtonText("baba")}>
				{buttonText}
			</button>
			<button name="next" variant="outlined">
				<Link to="/SomePage">
					Go to Some Page
				</Link>
			</button>
		</header>
		)
}

export default Home;
