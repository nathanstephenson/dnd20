import React, { useContext } from 'react';
import '../App.css';
import {useMutation} from '@apollo/client';
import {UserContext} from '../misc/UserContext';
import EditCampaign from '../components/EditCampaign'
import {addCampaign} from '../queries'

export default class Campaigns extends React.Component {

    static contextType = UserContext;

    constructor(props) {
        super(props)
        this.state = {selected:null, chosen:false, wantsNew:false, newName:"", newSubmitted:false, needsRefresh:false}
        this.handleEditSubmit = this.handleEditSubmit.bind(this)
        this.changeSelected = this.changeSelected.bind(this)
        this.clearSelected = this.clearSelected.bind(this)
        this.wantsNew = this.wantsNew.bind(this)
        this.newSubmitted = this.newSubmitted.bind(this)
        this.newNameChanged = this.newNameChanged.bind(this)
        this.resetWithNew = this.resetWithNew.bind(this)
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
    resetWithNew(newID){
        this.setState({wantsNew:false, newSubmitted:false, newName:""}, ()=>{this.changeSelected(newID)})
    }
    refreshed(){
        this.setState({needsRefresh:false})
    }

    render() {
        const {user} = this.context
        return(
            <>
                {!this.state.chosen && <DisplayCampaigns needsRefresh={this.state.needsRefresh} refreshed={this.refreshed} changeSelected={this.changeSelected}/>}
                {!this.state.chosen && <div>
                    {(!this.state.wantsNew && !this.state.newSubmitted) && <button onClick={this.wantsNew}>New Campaign</button>}
                    {(this.state.wantsNew && !this.state.newSubmitted) && <form className="Form" onSubmit={this.newSubmitted}>
                        <label htmlFor="name" className="tbLabel">Campaign Name: 
                        <input type="name" id="name" name="name" required={true} onChange={this.newNameChanged}/></label>
                        <input type="submit" value="Submit"/>
                    </form>}
                    {(this.state.wantsNew && this.state.newSubmitted) && <AddCampaign dm={user._id} name={this.state.newName} handleAdded={this.resetWithNew}/>}
                </div>}
                {this.state.chosen && <EditCampaign currentUserID={user._id} campaignID={this.state.selected} submit={this.handleEditSubmit} back={this.clearSelected}/>}
            </>
        )
    }
}

function DisplayCampaigns(props){//need to render the Campaign function for as many as there are in campaigns collection
    const {user, refreshUser} = useContext(UserContext)
    if(props.needsRefresh){
        refreshUser()
        props.refreshed()
    }
    const campaignList = []
    campaignList.push(<h2>These are your campaigns:</h2>)
    for (let i = 0; i<user.campaigns.length; i++){//adds jsx elemnts to the array
        campaignList.push(<Campaign campaign={user.campaigns[i]} changeSelected={props.changeSelected}/>)
    }
    return (
        <>
            <h1 className="title"> Campaigns </h1>
            {(user.campaigns.length===0) && <p>You are not currently participating in any campaigns.</p>}
            {(user.campaigns.length!==0) && campaignList}
        </>
    )
}

function Campaign(props){
    return (
        <ul className="campaign">
            <li key="c1" className="campaign_name">
                <p>{props.campaign.name}</p>
            </li>
            <li key="c2"><ul><li>
                <button onClick={() => props.changeSelected(props.campaign._id)}>
                    Edit
                </button>
            </li></ul></li>
        </ul>
    )
}

function AddCampaign(props){//here we just pray that no 2 campaigns have the same id (unlikely as it is 24-char hex)
    console.log("adding")
    const {user:currentUser} = useContext(UserContext)
    const [newCampaign, { data, loading }] = useMutation(addCampaign);//this method means it only gets added once
	while(loading){
		return(<p>Loading...</p>);
	}
    if(data===undefined){
        newCampaign({variables:{dm:currentUser._id, name:props.name}})
        console.log('attempted addCampaign')
    }else if(data != null){
        console.log('done', data)
        props.handleAdded(data.addCampaign._id)
    }
    return null
}