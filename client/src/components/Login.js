import React from 'react';
import '../App.css';

function checkUsername(String) {

}

function checkPassword(String) {

}

function Login() {
	return (
		<header className="App-header">
			<p>
				Please enter your username and password
			</p>
			<form id="loginform">
				<label for="user">username </label>
				<input
					className="usernameBox"
					type="text"
					name="user"
					required="true"
					autoFocus="true"
				></input><br />
				<label for="pass">password </label>
				<input
					className="passwordBox"
					type="password"
					name="pass"
					required="true"
				></input><br />
				<button onClick="checkUsername(user), checkPassword(pass)" variant="outlined">login</button>
				<input type="checkbox" id="rememberLogin" name="rememberLogin" value="True" />
				<label for="rememberLogin"> Remember me</label>
			</form>
		</header>
	)
}

export default Login;