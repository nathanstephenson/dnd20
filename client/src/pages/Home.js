import React, { useContext } from 'react';
import {useState} from 'react';
import '../App.css';
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
			<br/>
			<img src="images/Nooth_DnD.png" className="App-logo" alt="logo" />
			<br/>
			<h1 className="title">
				DnD20
			</h1>
			<button name="showpong" onClick={() => setButtonIfUser()}>
				{buttonText}
			</button>
			<p>welcome to the app, gamer</p>
		</>
	)
}
export default Home;
