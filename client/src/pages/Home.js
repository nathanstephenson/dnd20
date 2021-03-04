import React, { useContext } from 'react';
import {useState} from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import {UserContext} from '../components/Main';

function Home() {
	
	const me = useContext(UserContext).user;
	const [buttonText, setButtonText] = useState("Next");

	return(
		<header className="App-header">
			<img src="images/Nooth_DnD.png" className="App-logo" alt="logo" />
			<h1 className="title">
				DnD20
			</h1>
			<button name="showpong" onClick={() => setButtonText(me.name)}>
				{buttonText}
			</button>
			<Link to="/SomePage">
				<button name="next" variant="outlined">
					{buttonText}
				</button>
			</Link>
		</header>
	)
}
export default Home;
