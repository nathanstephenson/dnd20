import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import SomePage from '../pages/SomePage';
import SomeOtherPage from '../pages/SomeOtherPage';

const Main = () => {
	return (
	<Switch> {/* The Switch decides which component to show based on the current URL.*/}
		<Route exact path='/' component={Home}></Route>
		<Route exact path='/SomePage' component={SomePage}></Route>
		<Route exact path='/SomeOtherPage' component={SomeOtherPage}></Route>
	</Switch>
	);
}

export default Main;
