import React, {state} from 'react';
import {useMutation} from '@apollo/client'
import '../App.css';
import { Link } from "react-router-dom";
import {addUser} from '../queries';



class Register extends React.Component {
    constructor(props) {
        super(props);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleRegisterAttempt = this.handleRegisterAttempt.bind(this);
		this.state = {badForm:false, registered:false, name:"", email:"", username:"", password:""};
    }
	handleNameChange(e){
		e.preventDefault();
		this.setState({name: e.target.value});
	}
	handleEmailChange(e){
		e.preventDefault();
		this.setState({email: e.target.value});
	}
	handleUsernameChange(e){
        e.preventDefault();
        this.setState({username: e.target.value});
    }
    handlePasswordChange(e){
        e.preventDefault();
        this.setState({password: e.target.value});
    }

    handleRegisterAttempt(e){
        e.preventDefault();
		if(!!this.state.name && !!this.state.username && !!this.state.password){
			this.setState({registered: true});
		}else{
			this.setState({badForm: true})
		}
		//need check all fields are filled out
    }

    render() {
        return(//obviously needs more added
            <header className="App-header">
                {!this.state.registered && 
					<div>
						<img src="images/Nooth_DnD.png" width='300' alt="logo"/>
						<h1 className="title">
							Sign Up
						</h1>
						<form className="Form" onSubmit={this.handleRegisterAttempt}>
							<label htmlFor="fullname" className="tbLabel">Full Name: 
							<input type="name" id="fullname" name="fullname" required={true} onChange={this.handleNameChange} value={this.state.name}/></label><br/>
							<label htmlFor="email" className="tbLabel" name="tbLabel">Email: 
							<input type="email" id="email" name="email" onChange={this.handleEmailChange} value={this.state.email}/></label><br/>
							<label htmlFor="username" className="tbLabel" name="tbLabel">Username: 
							<input type="username" id="username" name="username" required={true} onChange={this.handleUsernameChange} value={this.state.username}/></label><br/>
							<label htmlFor="password" className="tbLabel" name="tbLabel">Password: 
							<input type="password" id="password" name="password" required={true} onChange={this.handlePasswordChange} value={this.state.password}/></label><br/>
							<input type="submit" value="Submit"/>
						</form><br/>
					</div>
				}
				{this.state.registered && <AddUser name={this.state.name} username={this.state.username} password={this.state.password}/>}
				{this.state.badForm && <p>Please make sure all boxes are filled in</p>/**this check seems redundant with the boxes being marked as required */}
				<Link to="/SomePage">
					<button name="next" variant="outlined">
						Go to some page
					</button>
				</Link>
            </header>
		)
    }
}

function AddUser(props){
	const [newUser, { called:called, loading:loading, error:error }] = useMutation(addUser);
	newUser({variables:{name:props.name, username:props.username, password:props.password}});//!!!works, but adds 3 entries (and all with a different ID...)
	while(called && loading){//warning about destructuring, but loading does show
		return(<p>Loading...</p>);
	}
	if(error){//not even sure what error can occur
		return(<p>An error occurred. ({error.extraInfo})</p>);
	}else{
		return(
			<div>
				<p>Welcome, {props.name}</p>
				<Link to="">
					<button>
						Log In
					</button>
				</Link>
			</div>
		);
	}
}

export default Register;