/**
 * This is the file that handles routing for the entire application
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {getUser} from '../queries';
import '../App.css'
import Home from '../pages/Home';
import SomePage from '../pages/SomePage';
import SomeOtherPage from '../pages/SomeOtherPage';
import Register from '../pages/Register';

export const UserContext = React.createContext(null);

function Main(props){

	console.log(props.username, props.password)
	const {data:currentUser} = useQuery(getUser, {variables:{username: props.username, password: props.password}});//returns null for some reason???, lazy returns undefined
	console.log(currentUser);//always undefined
	/* if(currentUser == null){//just gotta get this check right
		props.BadLogin();
	} *///this doesnt work and causes the query to return undefined

	return (
		<UserContext.Provider value={currentUser}>
			<Switch> {/* The Switch decides which component to show based on the current URL.*/}
				<Route exact path='/' component={Home}/>
				<Route exact path='/SomePage' component={SomePage}/>
				<Route exact path='/SomeOtherPage' component={SomeOtherPage}/>
				<Route exact path='/Register' component={Register}/>
			</Switch>
		</UserContext.Provider>
	);
}

export default Main;
