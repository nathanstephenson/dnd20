/**
 * This is the file that handles routing for the entire application
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {getUser} from '../queries';
import '../App.css';
import Home from '../pages/Home';
import SomePage from '../pages/SomePage';
import SomeOtherPage from '../pages/SomeOtherPage';
import Register from '../pages/Register';

export const UserContext = React.createContext(null);

function Main(props){

	console.log(props.username, props.password);
	const {loading, data, error} = useQuery(getUser, {variables:{username: props.username, password: props.password}});//returns null for some reason???, lazy returns undefined
	console.log(data);//always undefined
	
	while(loading){
		return (<p>loading...</p>);
	}
	while(error){
		return (<p>There was an error. Please try again.</p>);
	}
	while(data){
		if(data.user != null){
			return (
				<UserContext.Provider value={data.user}>
					<Switch> /* The Switch decides which component to show based on the current URL.*/
						<Route exact path='/' component={Home}/>
						<Route exact path='/SomePage' component={SomePage}/>
						<Route exact path='/SomeOtherPage' component={SomeOtherPage}/>
						<Route exact path='/Register' component={Register}/>
					</Switch>
				</UserContext.Provider>
			);
		}else{
			props.BadLogin();
			return (<p>Error: User not found</p>);
		}
	}
}

export default Main;
