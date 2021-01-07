import React from 'react';
import '../App.css';

function checkUsername() {

}

function checkPassword() {

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
					className="login"
					type="text"
					name="user"
					required="true"
					autoFocus="true"
				></input><br />
				<label for="pass">password </label>
				<input
					className="password"
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