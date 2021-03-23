import React from 'react';
import {useQuery} from '@apollo/client';
import {getUser} from '../queries';
import '../App.css';
import PageSwitch from './PageSwitch'

export const UserContext = React.createContext(null);

function Main(props){

	console.log(props.username, props.password);
	const {loading, data, error} = useQuery(getUser, {variables:{username: props.username, password: props.password}});//returns null for some reason???, lazy returns undefined
	console.log(data);
	
	while(loading){
		return (<p>loading...</p>);
	}
	while(error){
		return (<p>There was an error. Please try again.</p>);
	}
	while(data){
		if(data != null){
			return (
				<UserContext.Provider value={data.user}>
					<PageSwitch/>
				</UserContext.Provider>
			);
		}else{
			props.BadLogin();
			return (<p>Error: User not found</p>);
		}
	}
	return(<p>this happened</p>)
}

export default Main;
