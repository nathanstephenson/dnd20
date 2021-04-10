import React from 'react';
import {NetworkStatus, useQuery} from '@apollo/client';
import {UserContext} from '../misc/UserContext'
import {getUser} from '../queries';
import '../App.css';
import NavBar from './navbar'
import PageSwitch from './PageSwitch'


export default function Main(props){

	//console.log(props.username, props.password);
	const {loading, data, error, refetch, networkStatus} = useQuery(getUser, {variables:{username: props.username, password: props.password}, notifyOnNetworkStatusChange:true, fetchPolicy:'network-only'});
	console.log("Logged in user", data);
	
	while(networkStatus===NetworkStatus.refetch){
		return (<><NavBar currentUser={data.user}/><header><p>Retrieving your data...</p></header></>)
	}
	while(loading){
		return (<header>{/* <NavBar/> */}<p>Loading...</p></header>);
	}
	if(error){
		return (<p>There was an error. Please refresh the page and try again.</p>);
	}
	if(data != null){
		const context = { user:data.user, refreshUser:refetch }
		return (
			<><NavBar currentUser={data.user}/>
			<UserContext.Provider value={context}>
				<PageSwitch/>
			</UserContext.Provider></>
		);
	}else{
		props.BadLogin();
		return (<p>Error: User not found</p>);
	}
}
