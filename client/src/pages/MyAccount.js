import React, { useContext, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import '../App.css';
import {UserContext} from '../misc/UserContext'
import {getUserID} from '../queries'

export default function MyAccount(props) {
    const {user} = useContext(UserContext)
    return (
        <>
            <div>Name: {user.name}</div>
            <div>Username: {user.username}</div>
            <div>Campaigns participated in: {user.campaigns.length} (DM of {user.campaigns.filter(current => current.dm===user._id).length})</div>
            <div>Characters: {user.characters.length}</div>
        </>
    )
}