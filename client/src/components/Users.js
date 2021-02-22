import { useQuery } from '@apollo/client';
import React from 'react';
import {useState} from 'react';
import '../App.css';
import {getUsers, getUser} from "../queries"

function Users() {//this is to make sure queries work as intended & to debug any gql issues
	
	const [users, setUsers] = useState("click the button to get the name of the admin");
	const getusers = useQuery(getUsers).data;
	const me = useQuery(getUser, {variables: {username:"admin", password:"admin"}}).data;//returns null, idk why
	return(
		<div>
			<p>
				{users}
			</p>
			<button name="showusers" onClick={() => setUsers(JSON.stringify(getusers.users[0].name))}>
				get users
			</button>
		</div>
	)
}

export default Users;