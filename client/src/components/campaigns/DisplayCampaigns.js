import React, {useContext} from 'react'
import {UserContext} from '../../misc/UserContext'

export function DisplayCampaigns(props){//need to render the Campaign function for as many as there are in campaigns collection
    const {user, refreshUser} = useContext(UserContext)
    if(props.needsRefresh){
        refreshUser()
        props.refreshed()
    }
    const campaignList = user.campaigns.map((currentValue, index)=>{return <Campaign key={index} campaign={currentValue} changeSelected={props.changeSelected} purpose={props.purpose}/>})
    return (
        <>
            {(user.campaigns.length===0) && <p>You are not currently participating in any campaigns.</p>}
            {(user.campaigns.length!==0) && campaignList}
        </>
    )
}

function Campaign(props){
    return (
        <div className="campaign">
            <p key="c1" className="campaign-name">{props.campaign.name}</p>
            <ul><li key="editButton">
                {props.purpose==="Edit" && <button onClick={() => props.changeSelected(props.campaign._id)}>
                    Edit
                </button>}
                {props.purpose==="Play" && <button onClick={() => props.changeSelected(props.campaign.currentSession)}>
                    Play
                </button>}
            </li></ul>
        </div>
    )
}