import React, { useContext, useState } from 'react';
import '../App.css';
import {useMutation} from '@apollo/client';
import { UserContext } from '../components/Main';
import EditCampaign from '../components/EditCampaign'
import {addCampaign, renameCampaign} from '../queries'

export default class Campaigns extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props)
        this.state = {selected:null, chosen:false, wantsNew:false, newName:"", newSubmitted:false, currentUser:this.context}
        this.handleEditSubmit = this.handleEditSubmit.bind(this)
        this.changeSelected = this.changeSelected.bind(this)
        this.clearSelected = this.clearSelected.bind(this)
        this.wantsNew = this.wantsNew.bind(this)
        this.newSubmitted = this.newSubmitted.bind(this)
        this.newNameChanged = this.newNameChanged.bind(this)
    }

    handleEditSubmit(e){
        e.preventDefault();
    }

    changeSelected(selected){
        this.setState({selected:selected, chosen:true})
    }

    clearSelected(){
        this.setState({selected:null, chosen:false})
    }

    newNameChanged(e){
        e.preventDefault();
        this.setState({newName:e.target.value})
    }
    wantsNew(){
        this.setState({wantsNew:true})
    }
    newSubmitted(e){
        e.preventDefault()
        this.setState({newSubmitted:true})
    }
    resetNew(e){
        this.setState({wantsNew:false, newSubmitted:false, newName:""})
    }

    render() {
        const user = this.context
        return(
            <header className="App-header">
                {this.state.chosen===false && <DisplayCampaigns me={"me"} changeSelected={this.changeSelected}/>}
                {this.state.chosen===false && <div>
                    {(!this.state.wantsNew && !this.state.newSubmitted) && <button onClick={this.wantsNew}>New Campaign</button>}
                    {(this.state.wantsNew && !this.state.newSubmitted) && <form className="Form" onSubmit={this.newSubmitted}>
                        <label htmlFor="name" className="tbLabel">Campaign Name: 
                        <input type="name" id="name" name="name" required={true} onChange={this.newNameChanged}/></label>
                        <input type="submit" value="Submit"/>
                    </form>}
                    {(this.state.wantsNew && this.state.newSubmitted) && <AddCampaign dm={user._id} name={this.state.newName} handleAdded={this.resetNew}/>}
                </div>}
                {this.state.chosen===true && <EditCampaign campaign={this.state.selected} submit={this.handleEditSubmit} back={this.clearSelected}/>}
            </header>
        )
    }
}

function DisplayCampaigns(props){//need to render the Campaign function for as many as there are in campaigns collection
    const currentUser = useContext(UserContext)
    //console.log(currentUser)
    const campaignList = []
    for (let i = 0; i<currentUser.campaigns.length; i++){//adds jsx elemnts to the array
        campaignList.push(<Campaign campaign={currentUser.campaigns[i]} changeSelected={props.changeSelected}/>)
        //console.log(currentUser.campaigns[i])
    }
    return (
        <div>
            <img src="images/Nooth_DnD.png" className="App-logo" alt="logo" />
            <h1 className="title"> Campaigns </h1>
            <p>These are your campaigns:</p>
            {campaignList}
        </div>
    )
}

function Campaign(props){
    return (
        <div>
            <ul className="campaign">
                <li className="col1">
                    <p>{props.campaign.name}</p>
                </li>
                <li className="col2">
                    <button onClick={() => props.changeSelected(props.campaign)}>
                        Edit
                    </button>
                </li>
            </ul>
        </div>
    )
}

function AddCampaign(props){
    const currentUser = useContext(UserContext)
    console.log(currentUser)
    const [newCampaign, { loading, error }] = useMutation(addCampaign);//potentially runs twice because of the destructuring?
    newCampaign({variables:{dm:props.dm, id:props.name}})
	while(loading){//warning about destructuring, but loading does show
		return(<p>Loading...</p>);
	}
	if(error){
		return(<p>Some error ocurred ({error})</p>);
	}else{
        props.handleAdded()
		return(
			<div>
				<p>done</p>
			</div>
		);
	}
}
