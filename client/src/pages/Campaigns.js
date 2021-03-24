import React, { useContext } from 'react';
import '../App.css';
import { UserContext } from '../components/Main';

export default class Campaigns extends React.Component {
    constructor(props) {
        super(props)
        this.ChangeSelected = this.ChangeSelected.bind(this)
        this.ClearSelected = this.ClearSelected.bind(this)
        this.state = {selected:null, chosen:false}
    }

    ChangeSelected(selected){
        this.setState({selected:selected, chosen:true})
    }

    ClearSelected(){
        this.setState({selected:null, chosen:false})
    }

    render() {
        //const me = this.context
        //console.log(me)
        return(
            <header className="App-header">
                {this.state.chosen===false && <DisplayCampaigns me={"me"} changeSelected={this.ChangeSelected}/>}
                {this.state.chosen===true && <EditCampaign campaign={this.state.selected}/>}
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
        console.log(currentUser.campaigns[i])
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
                <ul className="col1">
                    <p>{props.campaign.name}</p>
                </ul>
                <ul className="col2">
                    <button /*onClick={props.changeSelected(props.campaign._id)}*/>
                        Edit
                    </button>
                </ul>
            </ul>
        </div>
    )
}

function EditCampaign(props) {
	const campaign = props.campaign
    console.log(campaign)
	if(campaign != null){
        return(
            <div>
                <img src="images/Nooth_DnD.png" className="App-logo" alt="logo" />
                <h1 className="title">
                    Edit "{campaign.name}"
                </h1>
            </div>
        )
    }else{
        return (
            <div>
                <p>couldn't find campaign</p>
            </div>
        )
    }
}

//Campaigns.contextType = UserContext
