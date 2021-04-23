import React from 'react'

export function PartyCharacters(props){
    const session = props.session
    const partyCharacters = session.characters.map((currentValue, index)=>{return <CharacterInfo key={index} character={currentValue.character}/>})
    return (
        <>
            {(session.characters.length===0) && <p>No characters in this party.</p>}
            {(session.characters.length!==0) && partyCharacters}
        </>
    )
}

function CharacterInfo(props){
    const character = props.character

    return (<div className="campaign">
        <p key="c1" className="campaign-name">{character.name}</p>
        <ul><li key="hp">
            <p>{character.hp}</p>
        </li></ul>
    </div>)
}