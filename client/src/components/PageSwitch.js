/**
 * This is the file that handles routing for the entire application
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../App.css';
import NavBar from './navbar'
import Home from '../pages/Home';
import Campaigns from '../pages/Campaigns';

function PageSwitch(props){
    return (
        <><NavBar/>
        <header className="App-header">
            <Switch> {/* The Switch decides which component to show based on the current URL.*/}
                <Route exact path='/' component={Home}/>
                <Route exact path='/Campaigns' component={Campaigns}/>
            </Switch>
        </header></>
    );
}

export default PageSwitch;
