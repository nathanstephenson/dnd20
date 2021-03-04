import React from 'react';
import {useLazyQuery} from '@apollo/client';
import {getUser, getUsers} from '../queries';

export function useUser(props){//props = username(String), password(String), returns a user
    const {called, loading, data} = useLazyQuery(getUser, {variables:{username: props.username, password: props.password}});
	while(called && loading){
		return( "Loading..." );
	}
	console.log(data);
	if (data.user){
        return( data.user.name );
    }else{
        return( "user not found" );
    }
}

export function GetUsers(){//no props, returns a list of users
    const {called, loading, data} = useLazyQuery(getUsers);
    while(called && loading){
        return("Loading...");
    }
    console.log(data)
    if(data.user){
        return(data);
    }else{
        return("no users");
    }
}