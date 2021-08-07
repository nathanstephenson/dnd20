import { useMutation } from '@apollo/client'
import React, { useContext } from 'react'
import { UserContext } from '../../misc/UserContext'
import { changeCharacterHealth } from '../../queries'

export function PartyCharacters(props){
    const {user} = useContext(UserContext)
    const session = props.session
    const partyCharacters = session.characters.map((currentValue, index)=>{return <CharacterInfo key={index} character={currentValue} sessionID={session._id} currentUser={user._id}/>})
    return (
        <>
            {(session.characters.length===0) && <p>No characters in this party.</p>}
            {(session.characters.length!==0) && partyCharacters}
        </>
    )
}

function CharacterInfo(props){
    const character = props.character.character
    const [changeHealth, {data}] = useMutation(changeCharacterHealth)
    return (<div className="campaign">
        <p key="c1" className="campaign-name">{character.name}</p>
        <ul>
            <li key="hp">
                <p>{character.hp}HP
                {character.user._id===props.currentUser && <>
                    <button onClick={()=>{changeHealth({variables:{session:props.sessionID, character:props.character._id, hp:character.hp+1}})}}>+</button>
                    <button onClick={()=>{changeHealth({variables:{session:props.sessionID, character:props.character._id, hp:character.hp-1}})}}>-</button>
                </>} at position {props.character.position}</p>
            </li>
        </ul>
    </div>)
}