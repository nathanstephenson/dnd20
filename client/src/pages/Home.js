import React, { useContext } from 'react';
import {useState} from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import {UserContext} from '../misc/UserContext';

function Home() {
	
	const {user:me} = useContext(UserContext);
	const [buttonText, setButtonText] = useState("Next");

	function setButtonIfUser(){
		if(me){
			setButtonText(me.name);
		}else{
			setButtonText("no user")
		}
	}

	return(
		<>
			<img src="images/Nooth_DnD.png" className="App-logo" alt="logo" />
			<h1 className="title">
				DnD20
			</h1>
			<button name="showpong" onClick={() => setButtonIfUser()}>
				{buttonText}
			</button>
		</>
	)
}
export default Home;
