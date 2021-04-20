import React, { useContext, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import '../App.css';
import {UserContext} from '../misc/UserContext'
import {getUserID} from '../queries'

export default function MyAccount(props) {
    const {user} = useContext(UserContext)

    return (
        <header className="App-header">

        </header>
    )
}