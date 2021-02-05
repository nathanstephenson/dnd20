import { useQuery } from '@apollo/client';
import React from 'react';
import {useState} from 'react';
import '../App.css';
import {getUsers} from "../queries"

function Users() {
	
	const [users, setUsers] = useState("click the button to fetch users");
	const getusers = useQuery(getUsers).data;
	console.log(getusers);
	return(
		<div>
			<p>
				{users}
			</p>
			<button name="showusers" onClick={() => setUsers(JSON.stringify(getusers.users[0].username))}>
				get users
			</button>
		</div>
	)
}

export default Users;