import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import {useMutation} from '@apollo/client';
import {UserContext} from '../misc/UserContext';
import EditCampaign from '../components/campaigns/EditCampaign'
import {addCampaign, joinExistingCampaign} from '../queries'
import {DisplayCampaigns} from '../components/campaigns/DisplayCampaigns'

export default function Campaigns(props) {
    const {user} = useContext(UserContext)
    const [selected, changeSelected] = useState(null)
    const [chosen, changeChosen] = useState(false)
    const [wantsNew, changeWantsNew] = useState(false)
    const [newName, changeNewName] = useState("")
    const [newSubmitted, changeNewSubmitted] = useState(false)
    const [needsRefresh, changeNeedsRefresh] = useState(false)
    const [wantsJoin, changeWantsJoin] = useState(false)
    const [joinName, changeJoinName] = useState("")
    const [joinSubmitted, changeJoinSubmitted] = useState(false)
    const [newCampaign, { data: addData, loading: addLoading }] = useMutation(addCampaign)
    const [joinCampaign, {data: joinData, loading: joinLoading}] = useMutation(joinExistingCampaign)

    useEffect(()=>{
        if(wantsNew && newSubmitted && !addLoading && addData===undefined){
            newCampaign({variables:{dm:user._id, name:newName}})
        }
        if(addData!==undefined){
            changeWantsNew(false)
            changeNewSubmitted(false)
            changeChosen(true)
            changeSelected(addData.addCampaign._id)
        }
    }, [addData, addLoading, newCampaign, newName, newSubmitted, user._id, wantsNew])

    useEffect(()=>{
        if(wantsJoin && joinSubmitted && !joinLoading && joinData===undefined){
            joinCampaign({variables:{id:joinName, user:user._id}})//causes bad request error 400 for some reason, but works in playground
        }
        if(joinData!==undefined){
            changeWantsJoin(false)
            changeJoinSubmitted(false)
            changeChosen(true)
            changeSelected(joinData.joinCampaign._id)
        }
    }, [joinCampaign, joinData, joinLoading, joinName, joinSubmitted, user._id, wantsJoin])

    return(<>
        {!chosen && <><h1 className="title"> Campaigns </h1>
            {!wantsJoin && <button onClick={()=>{changeWantsJoin(!wantsJoin)}}>Join Campaign</button>}
            {wantsJoin && <>
                <input type="campaign" onChange={(e)=>{e.preventDefault();changeJoinName(e.target.value)}} value={joinName}></input>
                <button onClick={()=>{changeJoinSubmitted(!joinSubmitted)}}>Join</button>
                <button onClick={()=>{changeWantsJoin(!wantsJoin)}}>x</button>
            </>}
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