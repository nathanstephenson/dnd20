import React from 'react';
import {Link} from "react-router-dom";
import '../App.css';
import Register from './Register';
import {useQuery} from '@apollo/client';
import {getUser} from '../queries'

class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.HandleLogin = this.props.HandleLogin;
        this.SetLogin = this.props.SetLogin;
        this.Registered = this.Registered.bind(this);
        this.NotRegistered = this.NotRegistered.bind(this);
        this.handleLoginAttempt = this.handleLoginAttempt.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {registered:true, loggedIn: false, username: "", password: ""};
    }

    handleUsernameChange(e){
        e.preventDefault(); 
        this.setState({username: e.target.value});
        //console.log(this.state.username);
    }
    handlePasswordChange(e){
        e.preventDefault();
        this.setState({password: e.target.value});
        //console.log(this.state.password);
    }

    handleLoginAttempt(e){//logs the form
        e.preventDefault();
        this.HandleLogin(this.state.username, this.state.password);
        this.setState({loggedIn: true});
    }

    NotRegistered(){
        this.setState({registered: false});
    }

    Registered(){
        this.setState({registered: true});
    }

    render() {
        return (
            <header className='App-header'><br/><br/>
                {(!this.state.loggedIn && this.state.registered) && //show login form if not logged in
                    (<div><form id="Form" className="Form" onSubmit={this.handleLoginAttempt}>
                        <p> Please enter your username and password </p>
                        <label htmlFor="user">Username: 
                            <input type="username" name="user" id="user" required={true} autoFocus={true} onChange={this.handleUsernameChange} value={this.state.username}/>
                        </label><br />
                        <label htmlFor="pass">Password: 
                            <input type="password" name="pass" id="pass" required={true} onChange={this.handlePasswordChange} value={this.state.password}/>
                        </label><br />
                        <input type="submit" value="Submit" variant="outlined"/>
                        <label htmlFor="rememberLogin"> Remember me
                            <input type="checkbox" id="rememberLogin" name="rememberLogin" value={this.state.loggedIn}/>{/*not implemented yet, checkbox doesnt even return anything on submit*/}
                        </label>
                    </form>
                    <button name="next2" variant="outlined" onClick={this.NotRegistered}>
                            register
                    </button>
                    </div>)
                }
                {(!this.state.registered && !this.state.loggedIn) && <Register Registered={this.Registered}/>}
                {this.state.loggedIn && <p onClick={this.SetLogin}>Loading...</p>}
            <br/><br/></header>
        )
    }
}
//{this.state.loggedIn && <GreetUser username={this.state.username} password={this.state.password}/> /*just an example of what to do once login attempt is made*/}
/* function GreetUser(props){//retrieves the user based on username and password and returns a greeting
    const {called, loading, data} = useQuery(getUser, {variables:{username: props.username, password: props.password}});
	//console.log(data);
	while(called && loading){
		return( <p>Loading...</p> )
	}
	if (data.user){
        return( <p>Hello, {data.user.name}! </p> )
    }else{
        return( <p>user not found</p> )
    }
} */

export default Login;