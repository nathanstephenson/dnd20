import React, {useContext} from 'react';
import {useMutation, useQuery} from '@apollo/client'
import '../../App.css';
import {UserContext} from '../../misc/UserContext'
import {getCampaign, renameCampaign, deleteCampaign} from '../../queries'

export default class EditCampaign extends React.Component {
    constructor(props) {
        super(props);
        this.campaignID = this.props.campaignID
        this.handleNameChange = this.handleNameChange.bind(this)
        this.submit = this.submit.bind(this)
        this.delete = this.delete.bind(this)
        this.submitted = this.submitted.bind(this)
        this.returnCampaign = this.returnCampaign.bind(this)
        this.toggleID = this.toggleID.bind(this)
        this.state = {submit:false, delete:false, loaded:false, campaign:null, name:"", showID:false}
    }

    handleNameChange(e){
		e.preventDefault();
		this.setState({name: e.target.value});
	}

    submit(e){
        this.setState({submit:true})
        this.props.submit(e)
    }

    delete(){
        this.setState({delete:true})
    }

    submitted(){
        this.setState({submit:false, delete:false}, ()=>{this.props.back()})
    }

    returnCampaign(campaign){
        console.log("selected campaign:", campaign)
        this.setState({campaign:campaign, name:campaign.name, loaded:true})
    }

    toggleID(){
        this.setState({showID:!this.state.showID})
    }

    render() {
        if(this.campaignID != null){
            let isDM = false
            if(this.state.campaign !== null){
                isDM = (this.props.currentUserID===this.state.campaign.dm)
            }
            return(//also need to add characters/users +/-
                <>
                    {(!this.state.loaded && !this.state.submit) && <div>
                        <LoadCampaign ID={this.campaignID} return={this.returnCampaign}/>
                    </div>}
                    {(this.state.loaded && !this.state.submit) && <div><img src="images/Nooth_DnD.png" className="App-logo" alt="logo" />
                        <h1 className="title">
                            Edit Campaign 
                        </h1>
                        {this.state.showID ? <><p>{this.campaignID}<button onClick={this.toggleID}>x</button></p></> : <button onClick={this.toggleID}>Show ID</button>}
                        <button onClick={this.delete}>Delete this campaign</button>
                        <form className="Form" onSubmit={this.submit}>
                            {isDM && <div><label htmlFor="name" className="tbLabel">Campaign Name: 
                            <input type="name" id="name" name="name" required={true} onChange={this.handleNameChange} value={this.state.name}/></label><br/></div>}
                            <input type="submit" value="Submit"/>
                        </form><br/>
                    </div>}
                    {this.state.submit && <SubmitCampaign submitted={this.submitted} id={this.campaignID} name={this.state.name}/>}
                    {this.state.delete && <DeleteCampaign submitted={this.submitted} dm={this.state.campaign.dm} campaignID={this.campaignID}/>}
                    <button onClick={this.props.back}>Go Back</button>
                </>
            )
        }else{
            return (
                <div>
                    <p>Error: No Campaign</p>
                    <button onClick={this.props.back}>Go Back</button>
                </div>
            )
        }
    }
}

function LoadCampaign(props){
    const {loading, data, error} = useQuery(getCampaign, {variables:{id:props.ID}, fetchPolicy:'network-only'})
    while(loading){
        return(<p>loading...</p>)
    }
    if(error){//no need to print errors here, as they wont. just if data && data.variable
        console.log(error)
        return(<p></p>)
    }else{
        props.return(data.campaign)
        return(<p>done</p>)
    }
}

function SubmitCampaign(props){
    const [submitCampaign, {data, loading}] = useMutation(renameCampaign)
    while(loading){
        return(<p>loading</p>)
    }
    if(data===undefined){
        submitCampaign({variables:{id:props.id, name:props.name}})
    }else{
        console.log(data)
        props.submitted()
    }
    return null
}

function DeleteCampaign(props){
    const {user:currentUser} = useContext(UserContext)
    const [delCampaign, { data, loading }] = useMutation(deleteCampaign);//this method means it only gets added once
	while(loading){
		return(<p>Loading...</p>);
	}
    if(data===undefined){
        delCampaign({variables:{user:currentUser._id, dm:props.dm, campaign:props.campaignID}})
        console.log('attempted deleteCampaign')
    }else if(data != null){
        console.log('done', data)
        props.submitted()
    }
    return null
}