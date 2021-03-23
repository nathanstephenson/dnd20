import React, { useContext } from 'react';
import {useState} from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import {UserContext} from '../components/Main';

class Campaigns extends React.Component {
    constructor(props) {
        super(props);
        this.changeSelected = this.changeSelected.bind(this)
        this.state = {selected:null, chosen:false}
    }

    changeSelected(selected){
        this.setState({selected:selected, chosen:true})
    }

    clearSelected(){
        this.setState({selected:null, chosen:false})
    }

    render() {
        const me = this.context
        console.log(me)
        return(
            <header className="App-header">
                {!this.state.chosen && <DisplayCampaigns me={me}/>}
                {this.state.chosen && <EditCampaign campaign={this.state.selected}/>}
            </header>
        )
    }
}

function DisplayCampaigns(props){//need to render the Campaign function for as many as there are in campaigns collection
    const currentUser = props.me
    console.log(currentUser)
    const campaignList = []
    for (const campaign in currentUser.campaigns){//adds jsx elemnts to the array
        campaignList.push(<Campaign campaign={campaign} changeSelected={props.changeSelected}/>)
    }
    return (
        <div>
            <img src="images/Nooth_DnD.png" className="App-logo" alt="logo" />
            <h1 className="title">
                Campaigns
            </h1>
            <p>These are your campaigns: {JSON.stringify(currentUser.campaigns)}</p>
            {campaignList}
        </div>
    )
}

function Campaign(props){
    return (
        <div>
            <ul className="campaign">
                <ul className="col1">
                    <p>{props.campaign.name}</p>
                </ul>
                <ul className="col2">
                    <button onClick={props.changeSelected(props.campaign._id)}>
                        Edit
                    </button>
                </ul>
            </ul>
        </div>
    )
}

function EditCampaign(props) {
	const campaign = props.campaign
	const me = useContext(UserContext);
    console.log(campaign)
	return(
		<header className="App-header">
			<img src="images/Nooth_DnD.png" className="App-logo" alt="logo" />
			<h1 className="title">
				Edit "{campaign.name}"
			</h1>
		</header>
	)
}

Campaigns.contextType = UserContext
export default Campaigns;
