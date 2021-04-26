import React, {useContext, useEffect, useState} from 'react'
import {useQuery, useMutation} from '@apollo/client'
import '../../App.css'
import {addCharacter, deleteCharacter, getCharacter, getClasses, getRaces, updateCharacterInfo, updateCharacterStats} from '../../queries'
import { arrayToOptions } from '../../functions/GeneralFunctions'
import { UserContext } from '../../misc/UserContext'

export default class EditCharacter extends React.Component {

    static contextType = UserContext

    constructor(props){
        super(props)
        this.user = this.props.currentUser
        this.characterID = this.props.characterID
        this.returnLoaded = this.returnLoaded.bind(this)
        this.submittedNew = this.submittedNew.bind(this)
        this.state = {character:null, submitNew:false, submitGeneral:false, name:"", race:"", bg:"", campaign:""}
    }

    returnLoaded(character){
        this.setState({character:character})
    }

    submittedNew(){
        this.setState({submitNew:false, name:"", race:"", bg:"", campaign:""})
        this.props.back()
    }

    render(){
        return(<>
            <button className="backButton" onClick={this.props.back}>Back</button>{/* vvv unloaded and unentered*/}
            {/* ((this.characterID!==null)&&(this.state.character===null)) ? <LoadCharacter ID={this.characterID} return={this.returnLoaded}/> : <CharacterInfo submitNewGeneral={this.submitNewGeneral} user={this.user} character={this.state.character} new={this.state.character===null}/> */}
            <CharacterInfo submitNew={this.submitNew} submitGeneral={this.submitGeneral} user={this.user} character={this.state.character} new={this.state.character===null} back={this.props.back}/>
            {((this.characterID!==null)&&(this.state.character===null)) && <LoadCharacter ID={this.characterID} return={this.returnLoaded}/>}
        </>)
    }
}

function LoadCharacter(props){
    console.log(props.ID)
    const {loading, data, error} = useQuery(getCharacter, {variables:{id:props.ID}, fetchPolicy:'network-only'})
    while(loading){
        return(<p>loading...</p>)
    }
    if(error){//no need to print errors here, as they wont. just if data && data.variable
        console.log(error)
        return(<p></p>)
    }else{
        console.log(data)
        props.return(data.character)
        return(<p>done</p>)
    }
}

function CharacterInfo(props){
    console.log('character info', props.new)
    const {loading:raceLoading, data:raceData} = useQuery(getRaces)
    const {loading:classLoading, data:classData} = useQuery(getClasses)
    const [page, changePage] = useState(0)
    while(classLoading||raceLoading){
        return(<p>Loading...</p>)
    }
    let pages = [
        (props.new ? <NewGeneralInfo races={raceData.races} user={props.user} submit={props.submitNew} back={props.back}/> : <ExistingGeneralInfo character={props.character} classes={classData.classes} submit={props.submitGeneral} back={props.back}/>),
    ]
    pages.forEach(element => {
        if(element!==pages[page]){
            element = null
        }
    })
    //make a set of buttons to change page with the index of the pages array
    return (<div>
        {pages}
    </div>)
}

function NewGeneralInfo(props){
    const {user} = useContext(UserContext)
    const [name, changeName] = useState("")
    const [background, changeBG] = useState("")
    const [race, changeRace] = useState("")
    const [campaign, changeCampaign] = useState("")
    const [createNew, {loading:newLoading, data:newData}] = useMutation(addCharacter)
    console.log(user.campaigns)
    useEffect(()=>{
        if (user.campaigns[0]!==undefined){
            console.log(user.campaigns[0]._id)
            changeCampaign(user.campaigns[0]._id)
        }
        if (props.races[0]!==undefined){
            console.log(props.races[0].index)
            changeRace(props.races[0].index)
        }
    },[props.races, user.campaigns])
    while(newLoading){
        return(<p>Loading...</p>)
    }
    if(newData!==undefined){
        props.back()
    }
    return (<form onSubmit={()=>{console.log(user._id, campaign, name, race, background);createNew({variables:{user:user._id, campaign:campaign, name:name, race:race, background:background}})}}>
        <input type="submit" /><br/>
        <label htmlFor="name" className="tbLabel">Name: 
        <input type="name" id="name" name="name" required={true} onChange={(e)=>{e.preventDefault();changeName(e.target.value)}} value={name}/></label>
        <CampaignSelect id="campaign" campaigns={user.campaigns} changeCampaign={changeCampaign}/><br/>
        <label htmlFor="bg" className="tbLabel">Background Info / Lore: 
        <textarea id="bg" name="bg" onChange={(e)=>{e.preventDefault();changeBG(e.target.value)}} value={background} rows="4" cols="50" maxLength="500"/></label><br/>
        <RaceSelect id="race" races={props.races} changeRace={changeRace}/><br/>
    </form>)
}

function ExistingGeneralInfo(props){
    const {user} = useContext(UserContext)
    const character = props.character
    const [campaign, changeCampaign] = useState(character.campaign)
    const [charClass, changeClass] = useState(character.class)
    const [str, changeStr] = useState(character.str)
    const [dex, changeDex] = useState(character.dex)
    const [con, changeCon] = useState(character.con)
    const [int, changeInt] = useState(character.int)
    const [wis, changeWis] = useState(character.wis)
    const [cha, changeCha] = useState(character.cha)//need to implement for maximum levels etc.
    const [rename, toggleRename] = useState(false)
    const [name, changeName] = useState(character.name)
    const [delCharacter, {loading:delLoading, data:delData}] = useMutation(deleteCharacter, {variables:{character:character._id, user:character.user, campaign:character.campaign}})
    const [updateInfo, {loading:infoLoading, data:infoData}] = useMutation(updateCharacterInfo, {variables:{id:character._id, name:name, campaign:campaign}})
    const [updateStats, {loading:statsLoading, data:statsData}] = useMutation(updateCharacterStats, {variables:{id:character._id, class:charClass, cha:parseInt(cha), con:parseInt(con), str:parseInt(str), dex:parseInt(dex), int:parseInt(int), wis:parseInt(wis)}})
    
    useEffect(()=>{//only runs once, because props.classes never changes
        if (props.classes[0]!==undefined){
            changeClass(props.classes[0].index)
        }
    },[props.classes])

    while(delLoading||infoLoading||statsLoading){
        if(delLoading){
            console.log(character._id, character.user, character.campaign)
        }
        return(<p>loading</p>)
    }
    if(delData!==undefined||infoData!==undefined||statsData!==undefined){
        props.back()
    }
    return (<><div><h2>{character.name}</h2>
        <button onClick={delCharacter}>Delete Character</button></div>
        {rename ? <>
            <form onSubmit={updateInfo}>
                <label htmlFor="name" className="tbLabel">Name: 
                <input type="text" id="name" name="name" required={true} onChange={(e)=>{e.preventDefault();changeName(e.target.value)}} value={name}/></label>
                <CampaignSelect id="campaign" current={campaign} campaigns={user.campaigns} changeCampaign={changeCampaign}/>
                <input type="submit"/><button onClick={()=>{toggleRename(!rename)}}>Cancel</button>
            </form>
        </> : <><button onClick={()=>{toggleRename(!rename)}}>Rename/ChangeCampaign</button><br/></>}
        <form onSubmit={updateStats}>
            <input type="submit" /><br/>
            <ClassSelect id="class" current={charClass} classes={props.classes} changeClass={changeClass}/><br/>
            <label htmlFor="str" className="tbLabel">Str: 
            <input type="number" id="str" name="str" min="1" max="20" required={true} onChange={(e)=>{e.preventDefault();changeStr(e.target.value)}} value={str}/></label>
            <label htmlFor="dex" className="tbLabel">Dex: 
            <input type="number" id="dex" name="dex" min="1" max="20" required={true} onChange={(e)=>{e.preventDefault();changeDex(e.target.value)}} value={dex}/></label>
            <label htmlFor="con" className="tbLabel">Con: 
            <input type="number" id="con" name="con" min="1" max="20" required={true} onChange={(e)=>{e.preventDefault();changeCon(e.target.value)}} value={con}/></label>
            <label htmlFor="int" className="tbLabel">Int: 
            <input type="number" id="int" name="int" min="1" max="20" required={true} onChange={(e)=>{e.preventDefault();changeInt(e.target.value)}} value={int}/></label>
            <label htmlFor="wis" className="tbLabel">Wis: 
            <input type="number" id="wis" name="wis" min="1" max="20" required={true} onChange={(e)=>{e.preventDefault();changeWis(e.target.value)}} value={wis}/></label>
            <label htmlFor="cha" className="tbLabel">Cha: 
            <input type="number" id="cha" name="cha" min="1" max="20" required={true} onChange={(e)=>{e.preventDefault();changeCha(e.target.value)}} value={cha}/></label>
        </form>
    </>)
}

function ClassSelect(props){
    let classOptions = arrayToOptions(props.classes, props.current)
    return(
        <label htmlFor="class" className="tbLabel">Class:
            <select id="classes" required={true} name="classes" onChange={(e)=>{props.changeClass(props.classes[e.target.selectedIndex].index)}}>
                {classOptions}
            </select>
        </label>
    )
}

function RaceSelect(props){
    const [selected, changeSelected] = useState(0)
    let raceOptions = arrayToOptions(props.races)
    return(
        <div><label htmlFor="races" required={true} className="tbLabel">Race:
            <select id="races" name="races" selectedIndex="0" onChange={(e)=>{props.changeRace(props.races[e.target.selectedIndex].index); changeSelected(e.target.selectedIndex)}}>
                {raceOptions}
            </select></label>
            <p>{props.races[selected].alignment}</p>
        </div>
    )
}

function CampaignSelect(props){
    const campaignOptions = arrayToOptions(props.campaigns, props.current)
    return(<>
        <label htmlFor="campaigns" className="tbLabel">Campaign:
            <select id="campaigns" name="campaigns" selectedIndex="0" required={true} onChange={(e)=>{props.changeCampaign(props.campaigns[e.target.selectedIndex]._id)}}>
                {campaignOptions}
            </select>
        </label>
    </>)
}
