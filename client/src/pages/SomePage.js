import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";

function SomePage() {
	return(
		<header className="App-header">
			<img src="images/Nooth_DnD.png" className="App-logo" alt="logo" />
			<p>
				Some Page
			</p>
			<p className="loginTitle">
				Looks like the routing works!
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
