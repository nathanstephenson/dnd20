
import React from 'react';
import '../App.css';
import {useLazyQuery} from '@apollo/client'
import {getUser} from '../queries'

function LoginForm(props){
    
	function handleSubmit(e){//!!!need callback in Login to pass this data back up!!!
		const formData = new FormData(e);//not allowed to use FormData. maybe able to use it actually
        for (const key in e) {
            formData.append(key, e[key]);
        }
        console.log(formData)
		//const username = formData.get("user");
		//const password = formData.get("pass");
        //console.log(username, password)//they show undefined
        e.preventDefault();
	}

    return (
        <form id="Form">
            <p> Please enter your username and password </p>
            <label htmlFor="user">Username: 
                <input type="username" name="user" required={true} autoFocus={true}></input>
            </label><br />
            <label htmlFor="pass">Password: 
                <input type="password" name="pass" required={true}></input>
            </label><br />
            <button onClick={handleSubmit} variant="outlined">login</button>
            <label htmlFor="rememberLogin"> Remember me
                <input type="checkbox" id="rememberLogin" name="rememberLogin" value="True" />
            </label>
        </form>
    )
}

function GreetUser(props){
    const [loaduser, {called, loading, data}] = useLazyQuery(getUser, {username: props.username});
	console.log(data);
	while(called && loading){
		return( <p>Loading...</p> )
	}
	if (data){
        return( <p> {data.name} </p> )
    }else{
        return( <p>"user not found"</p> )
    }
}

class Login extends React.Component {
    

    constructor(props) {
        super(props);
        this.loggedIn = false;
        this.username = '';
        this.password = '';
        this.state = {loggedIn: false, username: this.username, password: this.password};
    }


    render() {
		const username = this.state.username;
        const password = this.state.password;
        return (
            <div><br/><br/>
                {!(this.loggedIn) && <LoginForm/>}
                {this.loggedIn && <GreetUser username={username} password={password}/>}
            <br/><br/></div>
        )
    }
}

export default Login;