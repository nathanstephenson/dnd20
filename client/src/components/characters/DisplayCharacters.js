import { useQuery, useMutation, useSubscription } from '@apollo/client'
import React, {useContext, useEffect} from 'react'
import {UserContext} from '../../misc/UserContext'
import { currentSessionID, createSession, endSession } from '../../queries'

export function DisplayCharacters(props){//need to render the Campaign function for as many as there are in campaigns collection
    const {user, refreshUser} = useContext(UserContext)
    if(props.needsRefresh){
        refreshUser()
        props.refreshed()
    }
    const [startSession, {data: createSessionData}] = useMutation(createSession)
    const [finishSession, {data: endSessionData}] = useMutation(endSession)
    const currentUser = user
    const characterList = currentUser.characters.map((currentValue, index)=>{
        return <Character key={index} character={currentValue} changeSelected={props.changeSelected} purpose={props.purpose} currentUser={user} campaign={currentUser.campaigns.find(element => element._id===currentValue.campaign)}/>
    })
    if(props.purpose==="Play"){
        characterList.push(currentUser.campaigns.map(element=>{
            return (<>
                {user._id===element.dm && element.currentSession===null && 
                    <button onClick={() => startSession({variables:{campaign:element._id, user:user._id}})}>
                        Begin {element.name}
                    </button>
                }
                {user._id===element.dm && element.currentSession!==null && 
                    <button onClick={() => finishSession({variables:{campaign:element._id, user:user._id}})}>
                        End {element.name} session
                    </button>
                }
            </>)
        }))
    }
    return (
        <div>
            {props.purpose==="Play" && <button onClick={()=>{refreshUser()}}>Refresh</button>}
            {(user.characters.length===0) && <p>You do not currently have any characters.</p>}
            {(user.campaigns.length!==0) && characterList}
        </div>
    )
}

function Character(props){
    return (
        <div className="character">
            <p key="c1" className="character-name">{props.character.name}</p>
            <ul>
                <li key="mainButton">
                    {props.purpose==="Edit" && <button onClick={() => props.changeSelected(props.character._id)}>
                        Edit
                    </button>}
                    {(props.purpose==="Play" && props.campaign.currentSession!==null) && <button onClick={() => props.changeSelected(props.campaign.currentSession)}>
                        Play
                    </button>}
                </li>
            </ul>
        </div>
    )
}