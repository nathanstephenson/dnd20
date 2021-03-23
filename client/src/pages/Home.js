import React, { useContext } from 'react';
import {useState} from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import {UserContext} from '../components/Main';

function Home() {
	
	const me = useContext(UserContext);
	const [buttonText, setButtonText] = useState("Next");

	function setButtonIfUser(){
		if(me){
			setButtonText(me.name);
		}else{
			setButtonText("no user")
		}
	}

	return(
		<header className="App-header">
			<img src="images/Nooth_DnD.png" className="App-logo" alt="logo" />
			<h1 className="title">
				DnD20
			</h1>
			<button name="showpong" onClick={() => setButtonIfUser()}>
				{buttonText}
			</button>
			<Link to="/SomePage">
				<button name="next" variant="outlined">
					{buttonText}
				</button>
			</Link>
			<Link to="/Campaigns">
				<button name="next" variant="outlined">
					Campaigns
				</button>
			</Link>
		</header>
	)
}
export default Home;
