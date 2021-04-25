import { useLazyQuery } from '@apollo/client'
import React, {useContext} from 'react'
import {UserContext} from '../../misc/UserContext'
import { currentSessionID } from '../../queries'

export function DisplayCharacters(props){//need to render the Campaign function for as many as there are in campaigns collection
    const {user, refreshUser} = useContext(UserContext)
    if(props.needsRefresh){
        refreshUser()
        props.refreshed()
    }
    const characterList = user.characters.map((currentValue, index)=>{return <Character key={index} character={currentValue} changeSelected={props.changeSelected} purpose={props.purpose}/>})
    return (
        <div>
            {(user.characters.length===0) && <p>You do not currently have any characters.</p>}
            {(user.campaigns.length!==0) && characterList}
        </div>
    )
}

function Character(props){
    const [getSession, {data}] = useLazyQuery(currentSessionID, {variables:{campaign:props.character.campaign}})
    if(data!==undefined){
        props.changeSelected(data.getCurrentSessionID)
    }
    console.log(data)
    return (
        <div className="character">
            <p key="c1" className="characer-name">{props.character.name}</p>
            <ul>
                <li key="mainButton">
                    {props.purpose==="Edit" && <button onClick={() => props.changeSelected(props.character._id)}>
                        Edit
                    </button>}
                    {props.purpose==="Play" && <button onClick={() => getSession()}>
                        Play
                    </button>}
                </li>
            </ul>
        </div>
    )
}