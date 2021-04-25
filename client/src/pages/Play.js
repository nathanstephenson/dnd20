import React, { useContext, useEffect, useState } from 'react';
import { useSubscription, Subscription, useQuery } from '@apollo/client';
import '../App.css';
import {UserContext} from '../misc/UserContext'
import {currentSession, getUserID, onSessionUpdate} from '../queries'
import {PartyCharacters} from '../components/play/party'
import { DisplayCharacters } from '../components/characters/DisplayCharacters';

export default function Play(props) {
    const {user} = useContext(UserContext)
    const [selected, changeSelected] = useState(null)
    const [needsRefresh, setNeedsRefresh] = useState(false)
    const [needsRefetch, setNeedsRefetch] = useState(true)

    return (<header className="App-header">
        {selected!==null ? <PlayView sessionID={selected} needsRefetch={needsRefetch} refetched={()=>{setNeedsRefetch(false)}}/> : <DisplayCharacters needsRefresh={needsRefresh} refreshed={()=>{setNeedsRefresh(true)}} changeSelected={changeSelected} purpose="Play"/>}
    </header>)
}

function PlayView(props){
    const{data:queryData, loading:queryLoading, refetch} = useQuery(currentSession, {variables:{id:props.sessionID}})
    const {data:updateData, loading:updateLoading} = useSubscription(onSessionUpdate, {variables:{id:props.sessionID}})
    const [data, changeData] = useState(undefined)

    useEffect(()=>{
        if(props.needsRefetch){
            refetch()
            props.refetched()
        }
        if(updateData===undefined){
            if(queryLoading){
                console.log("loading")
            }
            if(queryData!==undefined){
                console.log(queryData.session)
                changeData(queryData.session)
            }
        }else{
            console.log(updateData.sessionUpdate)
            changeData(updateData.sessionUpdate)
        }
    }, [queryLoading, queryData, updateLoading, updateData, refetch, props])

    return (
        <>
            <h2>Play the game</h2>
            {data!==undefined ? <PartyCharacters session={data}/> : <p>No characters in this party.</p>}
        </>
    )
}

