import React, {useContext} from 'react'
import {UserContext} from '../../misc/UserContext'

export function DisplayCharacters(props){//need to render the Campaign function for as many as there are in campaigns collection
    const {user, refreshUser} = useContext(UserContext)
    if(props.needsRefresh){
        refreshUser()
        props.refreshed()
    }
    const characterList = []
    for (let i = 0; i<user.characters.length; i++){//adds jsx elemnts to the array
        characterList.push(<Character character={user.characters[i]} changeSelected={props.changeSelected}/>)
    }
    return (
        <div>
            {(user.characters.length===0) && <p>You do not currently have any characters.</p>}
            {(user.campaigns.length!==0) && characterList}
        </div>
    )
}

function Character(props){
    return (
        <div className="character">
            <p key="c1" className="characer-name">{props.character.name}</p>
            <ul><li key="editButton">
                <button onClick={() => props.changeSelected(props.character._id)}>
                    Edit
                </button>
            </li></ul>
        </div>
    )
}