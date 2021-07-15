import React, {useEffect} from 'react';
import {useQuery, useMutation} from '@apollo/client'
import '../App.css';
import { Link } from "react-router-dom";
import {addUser, doesUserExist, getUserID} from '../queries';



class Register extends React.Component {
    constructor(props) {
        super(props);
		this.Registered = this.props.Registered;
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
		if(!!this.state.name && !!this.state.email && !!this.state.username && !!this.state.password){
			this.setState({registered: true});
		}else{
			this.setState({badForm: true})
		}
		//need check all fields are filled out
    }

    render() {
        return(//obviously needs more added
            <>
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
							<input type="email" id="email" name="email" required={true} onChange={this.handleEmailChange} value={this.state.email}/></label><br/>
							<label htmlFor="username" className="tbLabel" name="tbLabel">Username: 
							<input type="username" id="username" name="username" required={true} onChange={this.handleUsernameChange} value={this.state.username}/></label><br/>
							<label htmlFor="password" className="tbLabel" name="tbLabel">Password: 
							<input type="password" id="password" name="password" required={true} onChange={this.handlePasswordChange} value={this.state.password}/></label><br/>
							<input type="submit" value="Submit"/>
						</form><br/>
					</div>
				}
				{this.state.registered && <AddUser name={this.state.name} email={this.state.email} username={this.state.username} password={this.state.password}/>}
				{this.state.badForm && <p>Please make sure all boxes are filled in</p>/**this check seems redundant with the boxes being marked as required */}
				<button onClick={this.Registered} name="next" variant="outlined">
					Go back to login
				</button>
            </>
		)
    }
}

function AddUser(props){
	const {data:queryData, loading:queryLoading} = useQuery(doesUserExist, {variables: {username:props.username}}, {fetchPolicy:'network-only'});//check email instead of password here, as password does not need to be unique
	const [newUser, { data, loading }] = useMutation(addUser);
	while (queryLoading||loading) {console.log("loading");return(<p>Loading...</p>)}
	console.log(queryData.getUserID)
	if(queryData!==undefined){
		if(queryData.doesUserExist===false && !queryLoading){//apparently here cannot read 'undefined' user, but that same method works in login???
			console.log("user doesn't already exist")
			if(data===undefined){
				console.log("adding user")
				newUser({variables:{name:props.name, email:props.email, username:props.username, password:props.password}});
			}else if(data!=null){
				console.log(data)
				return(<>
					<p>Welcome, {props.name}</p>
				</>);
			}
		}else if(queryData.doesUserExist===true && !queryLoading){
			console.log("user already exists", queryData.getUserID)
			return (
				<p>Error: User already exists, try again</p>
			);
		}
	}
	return <p></p>
}

export default Register;