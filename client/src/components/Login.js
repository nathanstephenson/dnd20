
import React from 'react';
import '../App.css';
import {useQuery} from '@apollo/client'
import {getUser} from '../queries'
//import LoginForm from './loginForm'

class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleLoginAttempt = this.handleLoginAttempt.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {loggedIn: false, username: "", password: ""};
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
        this.setState({loggedIn: true});
    }

    render() {
        return (
            <div><br/><br/>
                {!(this.state.loggedIn) && //show login form if not logged in
                    (<form id="Form" onSubmit={this.handleLoginAttempt}>
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
                    </form>)
                }
                {this.state.loggedIn && <GreetUser username={this.state.username} password={this.state.password}/> /*just an example of what to do once login attempt is made*/}
            <br/><br/></div>
        )
    }
}

function GreetUser(props){//retrieves the user based on username and password and returns a greeting
    const {called, loading, data} = useQuery(getUser, {variables:{username: props.username, password: props.password}});
	console.log(data);
	while(called && loading){
		return( <p>Loading...</p> )
	}
	if (data.user){//for some reason this comes back null
        return( <p>Hello, {data.user.name}! </p> )
    }else{
        return( <p>user not found</p> )
    }
}

export default Login;