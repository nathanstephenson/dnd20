import React, { useContext } from 'react';
import '../App.css';
import {UserContext} from '../misc/UserContext';
import EditCharacter from '../components/characters/EditCharacter'
import {DisplayCharacters} from '../components/characters/DisplayCharacters'

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
