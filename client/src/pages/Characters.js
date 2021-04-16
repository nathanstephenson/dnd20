import React, { useContext } from 'react';
import '../App.css';
import {UserContext} from '../misc/UserContext';
import EditCharacter from '../components/EditCharacter'

export default class Characters extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props)
        this.state = {selected:null, chosen:false, needsRefresh:false, needsSubmit:false}
        this.handleEditSubmit = this.handleEditSubmit.bind(this)
        this.changeSelected = this.changeSelected.bind(this)
        this.clearSelected = this.clearSelected.bind(this)
        this.wantsNew = this.wantsNew.bind(this)
        this.refreshed = this.refreshed.bind(this)
    }

    handleEditSubmit(e){
        e.preventDefault();
    }

    changeSelected(selected){
        this.setState({selected:selected, chosen:true})
    }

    clearSelected(){//need to update context
        this.setState({selected:null, chosen:false, needsRefresh:true})
    }
    wantsNew(){
        this.setState({chosen:true})
    }
    refreshed(){
        this.setState({needsRefresh:false})
    }

    render() {
        const {user} = this.context
        return(
            <>
                <h1 className="title"> Characters </h1>
                {!this.state.chosen && <>
                    <button onClick={this.wantsNew}>New Character</button>
                    <DisplayCharacters needsRefresh={this.state.needsRefresh} refreshed={this.refreshed} changeSelected={this.changeSelected}/> 
                </>}
                {this.state.chosen && <EditCharacter currentUser={user} characterID={this.state.selected} submit={this.handleEditSubmit} back={this.clearSelected}/>}
            </>
        )
    }
}

function DisplayCharacters(props){//need to render the Campaign function for as many as there are in campaigns collection
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

function SubmitNew(){
    
}