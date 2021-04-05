import React from 'react';
import '../App.css';
import {useMutation} from '@apollo/client'
import {renameCampaign} from '../queries'

export default class EditCampaign extends React.Component {
    constructor(props) {
        super(props);
        this.campaign = this.props.campaign
        console.log(this.campaign)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.submit = this.submit.bind(this)
        this.state = {name:this.campaign.name}
    }

    handleNameChange(e){
		e.preventDefault();
		this.setState({name: e.target.value});
	}

    submit(){

    }

    render() {
        if(this.campaign != null){
            return(//also need to add characters/users +/-
                <div>
                    <img src="images/Nooth_DnD.png" className="App-logo" alt="logo" />
                    <h1 className="title">
                        Edit Campaign
                    </h1>
                    <form className="Form" onSubmit={this.submit().then((e)=>{this.props.submit(e)})}>
                        <label htmlFor="name" className="tbLabel">Campaign Name: 
                        <input type="name" id="name" name="name" required={true} onChange={this.handleNameChange} value={this.state.name}/></label><br/>
                        <input type="submit" value="Submit"/>
                    </form><br/>
                    <button onClick={this.props.back}>Go Back</button>
                </div>
            )
        }else{
            return (
                <div>
                    <p>couldn't find campaign</p>
                    <button onClick={this.props.back}>Go Back</button>
                </div>
            )
        }
    }
}

function RenameCampaign(){
    
}