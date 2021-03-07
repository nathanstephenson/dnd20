import React, { useContext } from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import {UserContext} from '../components/Main';

function SomePage() {

	const me = useContext(UserContext);

	return(
		<header className="App-header">
			<img src="images/Nooth_DnD.png" className="App-logo" alt="logo" />
			<p>
				Some Page
			</p>
			<p className="loginTitle">
				Hi, {me.name}! Your unique ID is: {me._id}.
			</p>
			<Link to="SomeOtherPage">
				<button variant="outlined">
					Go to some other page
				</button>
			</Link>
		</header>
	)
}
export default SomePage;
