/**
 * This is the file that handles routing for the entire application
 */



import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../App.css'

import Home from '../pages/Home';
import SomePage from '../pages/SomePage';
import SomeOtherPage from '../pages/SomeOtherPage';
import Register from '../pages/Register';

const Main = () => {
	return (
	<Switch> {/* The Switch decides which component to show based on the current URL.*/}
		<Route exact path='/' component={Home}></Route>
		<Route exact path='/SomePage' component={SomePage}></Route>
		<Route exact path='/SomeOtherPage' component={SomeOtherPage}></Route>
		<Route exact path='/Register' component={Register}></Route>
	</Switch>
	);
}

export default Main;
