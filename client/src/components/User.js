import React, {useState} from 'react';
import '../App.css';
import { useLazyQuery } from '@apollo/client';
import {getUser} from "../queries"

function User(props) {
	
	const [loaduser, {called, loading, data}] = useLazyQuery(getUser, {username: props.username});
	console.log(data);
	if(called && loading){
		return <p>Loading...</p>
	}
	if (!called){
		return <div>
			<button name="showusers" onClick={() => loaduser}>
				get your name
			</button>
		</div>
	}
	return(
		<p>
			{data.name}
		</p>
	)
}

export default User;