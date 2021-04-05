/**
 * This is the file that handles routing for the entire application
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../App.css';
import {UserContext} from './Main'
import Home from '../pages/Home';
import SomePage from '../pages/SomePage';
import SomeOtherPage from '../pages/SomeOtherPage';
import Register from '../pages/Register';
import Campaigns from '../pages/Campaigns';

function PageSwitch(){
    //Campaigns.contextType = UserContext
    return (
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/' component={Home}/>
            <Route exact path='/SomePage' component={SomePage}/>
            <Route exact path='/SomeOtherPage' component={SomeOtherPage}/>
            <Route exact path='/Register' component={Register}/>
            <Route exact path='/Campaigns' component={Campaigns}/>
        </Switch>
    );
}

export default PageSwitch;
