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
    const characterList = currentUser.characters.map((currentValue, index)=>{//doesn't render if user doesn't have campaign
        var cam = currentUser.campaigns.find(element => element._id===currentValue.campaign)
        return <Character key={index} character={currentValue} changeSelected={props.changeSelected} purpose={props.purpose} currentUser={user} campaign={cam}/>
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
        console.log(props.campaign)
    return (
        <div className="character">
            <p key="c1" className="character-name">{props.character.name}</p>
            <ul>
                <li key="mainButton">
                    {props.purpose==="Edit" && <button onClick={() => props.changeSelected(props.character._id)}>
                        Edit
                    </button>}
                    {((props.purpose==="Play" && props.campaign!==undefined) && props.campaign.currentSession!==null) && <button onClick={() => {props.changeSelected(props.campaign.currentSession, props.character._id)}}>
                        Play
                    </button>}
                </li>
            </ul>
        </div>
    )
}