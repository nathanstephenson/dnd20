import { useQuery, useMutation } from '@apollo/client'
import React, {useContext} from 'react'
import {UserContext} from '../../misc/UserContext'
import { currentSessionID, createSession, endSession, currentUser } from '../../queries'

export function DisplayCharacters(props){//need to render the Campaign function for as many as there are in campaigns collection
    const {user, refreshUser} = useContext(UserContext)
    if(props.needsRefresh){
        refreshUser()
        props.refreshed()
    }
    const [startSession, {data: createSessionData}] = useMutation(createSession)
    const [finishSession, {data: endSessionData}] = useMutation(endSession)
    const characterList = user.characters.map((currentValue, index)=>{return <Character key={index} character={currentValue} changeSelected={props.changeSelected} purpose={props.purpose} currentUser={user}/>})
    if(props.purpose==="Play"){
        characterList.push(user.campaigns.map(element=>{
            return (<>
                {user._id===element.dm && element.currentSession===null && <button onClick={() => startSession({variables:{campaign:element._id, user:user._id}})}>
                    Begin {element.name}
                </button>}
                {user._id===element.dm && element.currentSession!==null && <button onClick={() => finishSession({variables:{campaign:element._id, user:user._id}})}>
                    End {element.name} session
                </button>}
            </>)
        }))
    }
    return (
        <div>
            {props.purpose==="Play" && <button onclick={()=>{refreshUser()}}>Refresh</button>}
            {(user.characters.length===0) && <p>You do not currently have any characters.</p>}
            {(user.campaigns.length!==0) && characterList}
        </div>
    )
}

function Character(props){
    const {data} = useQuery(currentSessionID, {variables:{campaign:props.character.campaign}}, {fetchPolicy:'network-only'})
    return (
        <div className="character">
            <p key="c1" className="characer-name">{props.character.name}</p>
            <ul>
                <li key="mainButton">
                    {props.purpose==="Edit" && <button onClick={() => props.changeSelected(props.character._id)}>
                        Edit
                    </button>}
                    {(props.purpose==="Play" && data!==undefined) &&  (data.getCurrentSessionID!==null && <button onClick={() => props.changeSelected(data.getCurrentSessionID)}>
                        Play
                    </button>)}
                </li>
            </ul>
        </div>
    )
}