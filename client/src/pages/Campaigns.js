import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import {useMutation} from '@apollo/client';
import {UserContext} from '../misc/UserContext';
import EditCampaign from '../components/campaigns/EditCampaign'
import {addCampaign} from '../queries'
import {DisplayCampaigns} from '../components/campaigns/DisplayCampaigns'

export default function Campaiagns(props) {
    const {user} = useContext(UserContext)
    const [selected, changeSelected] = useState(null)
    const [chosen, changeChosen] = useState(false)
    const [wantsNew, changeWantsNew] = useState(false)
    const [newName, changeNewName] = useState("")
    const [newSubmitted, changeNewSubmitted] = useState(false)
    const [needsRefresh, changeNeedsRefresh] = useState(false)
    const [wantsJoin, changeWantsJoin] = useState(false)
    const [joinName, changeJoinName] = useState("")
    const [newCampaign, { data, loading }] = useMutation(addCampaign)

    useEffect(()=>{
        if(wantsNew && newSubmitted && !loading && data===undefined){
            newCampaign({variables:{dm:user._id, name:newName}})
        }
        if(data!==undefined){
            changeWantsNew(false)
            changeNewSubmitted(false)
            changeChosen(true)
            changeSelected(data.addCampaign._id)
        }
    }, [wantsNew, newSubmitted, newCampaign, user._id, newName, data, loading])

    return(<>
        {!chosen && <><h1 className="title"> Campaigns </h1>
            {!wantsJoin && <button onClick={()=>{changeWantsJoin(!wantsJoin)}}>Join Campaign</button>}
            {wantsJoin && <><input type="campaign" onChange={(e)=>{e.preventDefault();changeJoinName(e.target.value)}} value={joinName}></input><button onClick={()=>{}}>Join</button><button onClick={()=>{changeWantsJoin(!wantsJoin)}}>x</button></>}
            {(!wantsNew && !newSubmitted) && <button onClick={()=>{changeWantsNew(!wantsNew)}}>+</button>}
            {(wantsNew && !newSubmitted) && <>
                <form className="Form" onSubmit={(e)=>{e.preventDefault();changeNewSubmitted(!newSubmitted)}}>
                    <label htmlFor="name" className="tbLabel">Campaign Name: 
                    <input type="name" id="name" name="name" required={true} onChange={(e)=>{e.preventDefault();changeNewName(e.target.value)}} value={newName}/></label>
                    <input type="submit" value="Submit"/>
                    <button onClick={()=>{changeWantsNew(!wantsNew)}}>x</button>
                </form>
            </>}<br/><br/>
            <DisplayCampaigns needsRefresh={needsRefresh} refreshed={()=>{changeNeedsRefresh(false)}} changeSelected={(selected)=>{changeSelected(selected);changeChosen(true)}} purpose="Edit"/>
        </>}
        {chosen && <EditCampaign currentUserID={user._id} campaignID={selected} submit={()=>{}} back={()=>{changeSelected(null);changeChosen(false);changeNeedsRefresh(true)}}/>}
    </>)
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