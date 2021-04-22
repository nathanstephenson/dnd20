import React from 'react';
import {NetworkStatus, useQuery} from '@apollo/client';
import {UserContext} from '../misc/UserContext'
import {getUserByID} from '../queries';
import '../App.css';
import NavBar from './navbar'
import PageSwitch from './PageSwitch'


export default function Main(props){

	const {loading, data, error, refetch, networkStatus} = useQuery(getUserByID, {variables:{id:props.id}, notifyOnNetworkStatusChange:true, fetchPolicy:'network-only'});
	
	while(networkStatus===NetworkStatus.refetch){
		return (<><NavBar currentUser={data.user}/><header><p>Retrieving your data...</p></header></>)
	}
	while(loading){
		return (<header><p>Loading...</p></header>);
	}
	if(error){
		return (<p>There was an error. Please refresh the page and try again.</p>);
	}
	if(data !== undefined){
		//console.log("Logged in user", data);
		const context = { user:data.user, refreshUser:refetch }
		return (
			<><NavBar currentUser={data.user}/>
			<UserContext.Provider value={context}>
				<PageSwitch/>
			</UserContext.Provider></>
		);
	}
}
