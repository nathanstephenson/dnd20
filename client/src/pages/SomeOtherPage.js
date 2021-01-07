import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";

function SomeOtherPage() {
	return(
		<header className="App-header">
			<img src="images/Nooth_DnD.png" className="App-logo" alt="logo" />
			<p>
				dnD20
			</p>
			<Link to="SomePage">
				<button variant="outlined">
					Go back to some page
				</button>
			</Link>
			<Link to="">
				<button variant="outlined">
					Go back home
				</button>
			</Link>
		</header>
	)
}

export default SomeOtherPage;
