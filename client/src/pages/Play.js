import React, { useContext, useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';
import '../App.css';
import {UserContext} from '../misc/UserContext'
import {getUserID, onSessionUpdated} from '../queries'

export default function Play(props) {
    const {user} = useContext(UserContext)
    const {data, loading} = useSubscription(onSessionUpdated, {variables:{id:"607c9a112717dc18fcbc68bc"}})
    while(loading){
        console.log("loading")
        return (<p>loading</p>)
    }
    if(data!==undefined){
        console.log(data)
    }
    return (
        <header className="App-header">
            <h2>Play the game</h2>
        </header>
    )
}