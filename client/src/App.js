import React from 'react';
import './App.css';
import Main from './components/Main.js';
import Login from './pages/Login';

class App extends React.Component {
    constructor(props) {
        super(props);
		this.LoginUser = this.LoginUser.bind(this);
        this.SetLoggedIn = this.SetLoggedIn.bind(this);
        this.InvalidLogin = this.InvalidLogin.bind(this);
		this.state = {username:"", password:"", loginError: false, isLoggedIn: false};
    }

	LoginUser(username, password){//for some reason this starts performing async and messes the whole thing up
		this.setState({username: username, password: password}, ()=>{console.log(this.state.username, this.state.password);});
        
	}

    SetLoggedIn(){
        this.setState({isLoggedIn: true, loginError: false}, ()=>{console.log("logged in")});
    }

    InvalidLogin(){//maybe want to look into a "validUser" bool instead of an option for good and one for bad
        this.setState({loginError: true, isLoggedIn: false}, ()=>{console.log("logged out due to error")});
    }

    render() {

        return (
            <div className="App">
                {!this.state.isLoggedIn && <Login BadAttempt={this.state.loginError} HandleLogin={this.LoginUser} SetLogin={this.SetLoggedIn}/>}
                {this.state.isLoggedIn && <Main username={this.state.username} password={this.state.password} BadLogin={this.InvalidLogin}/>}
            </div>
        );
    }
}
export default App;
