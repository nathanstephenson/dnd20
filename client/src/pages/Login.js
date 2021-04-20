import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import '../App.css';
import Register from './Register';
import {getUserID} from '../queries'

export default function Login(props) {
    const [id, setID] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [registered, toggleRegistered] = useState(true)
    const [stayLoggedIn, setStay] = useState(false)
    const [badLogin, toggleBadLogin] = useState(false)
    const [getID, {data, loading, called}] = useLazyQuery(getUserID, {fetchPolicy:'network-only'})

    useEffect(()=>{//if the client recieves an id upon request, the user may continue. if not, they are stuck
        if(!loading&&(id!==null)){
            props.handleLogin(id)
        }
        if(!loading && called && id===null){
            if(data!==undefined){
                setID(data.getUserID)
            }else{
                toggleBadLogin(true)
            }
        }
    }, [loading, called, id, data, props])

    return (
        <header className="App-header">
            {registered && //show login form if not logged in
                (<><div><form id="Form" className="Form" onSubmit={(e)=>{e.preventDefault();getID({variables:{username:username, password:password}})}}>
                        <p> Please enter your username and password </p>
                        <label htmlFor="user">Username: 
                            <input type="username" name="user" id="user" required={true} autoFocus={true} value={username} onChange={(e)=>{e.preventDefault();setUsername(e.target.value)}}/>
                        </label><br />
                        <label htmlFor="pass">Password: 
                            <input type="password" name="pass" id="pass" required={true} value={password} onChange={(e)=>{e.preventDefault();setPassword(e.target.value);}}/>
                        </label><br />
                        <input type="submit" value="Submit" variant="outlined"/>
                        <label htmlFor="rememberLogin"> Remember me
                            <input type="checkbox" id="rememberLogin" name="rememberLogin" value={stayLoggedIn}/>{/*not implemented yet*/}
                        </label>
                    </form>
                    <button name="next2" variant="outlined" onClick={()=>{toggleRegistered(false)}}>
                            register
                    </button>
                </div>
                {badLogin && <p>Could not find a user to match input username and password.</p>}</>)
            }
            {loading && <p>loading...</p>}
            {!registered && <Register Registered={()=>{toggleRegistered(true)}}/>}
        </header>
    )
}

/* class Login extends React.Component {//old version (class)
    
    constructor(props) {
        super(props);
        this.HandleLogin = this.props.HandleLogin;
        this.SetLogin = this.props.SetLogin;
        this.BadLogin = this.props.BadLogin;
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
        this.SetLogin();
    }

    NotRegistered(){
        this.setState({registered: false});
    }

    Registered(){
        this.setState({registered: true});
    }

    render() {
        return (
            <header className="App-header">
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
                            <input type="checkbox" id="rememberLogin" name="rememberLogin" value={this.state.loggedIn}//not implemented yet, checkbox doesnt even return anything on submit
                        </label>
                    </form>
                    <button name="next2" variant="outlined" onClick={this.NotRegistered}>
                            register
                    </button>
                    {this.BadLogin && <p>Could not find a user to match input username and password.</p>}
                    </div>)
                }
                {(!this.state.registered && !this.state.loggedIn) && <Register Registered={this.Registered}/>}
            </header>
        )
    }
} */