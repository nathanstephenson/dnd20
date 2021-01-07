import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
	* Import all page components here
	*/
import App from './components/App';
import Home from './components/Home';
import SomePage from './components/SomePage';
import SomeOtherPage from './components/SomeOtherPage';
/**
	* All routes go here.
	* Don't forget to import the components above after adding new route.
	*/
export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="/components/Home" component={Home} />
		<Route path="/components/SomePage" component={SomePage} />
		<Route path="/components/SomeOtherPage" component={SomeOtherPage} />
	</Route> //indexroute component was "MainPage" but this doesn't make sense, not sure what this definition does anyway but it's here
);
