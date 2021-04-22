import React, { useContext, useEffect, useState } from 'react';
import { useSubscription, Subscription } from '@apollo/client';
import '../App.css';
import {UserContext} from '../misc/UserContext'
import {getUserID, onSessionUpdate} from '../queries'

export default function Play(props) {
    const {user} = useContext(UserContext)
    const {data, loading} = useSubscription(onSessionUpdate, {variables:{id:"607c9a112717dc18fcbc68bc"}})
    
    useEffect(()=>{
        if(loading){
            console.log("loading")
        }
        if(data!==undefined){
            console.log(data)
        }
    }, [loading, data, props])

    return (
        
        <header className="App-header">
            <h2>Play the game</h2>
        </header>
    )
}