import React, {useState} from 'react'
import {useQuery} from '@apollo/client'
import '../App.css'
import {getCharacter, getClasses, getRaces} from '../queries'
import { arrayToOptions } from '../misc/GeneralFunctions'
import { UserContext } from '../misc/UserContext'

export default class EditCharacter extends React.Component {

    static contextType = UserContext

    constructor(props){
        super(props)
        this.user = this.props.currentUser
        this.characterID = this.props.characterID
        this.returnLoaded = this.returnLoaded.bind(this)
        this.submitNewGeneral = this.submitNewGeneral.bind(this)
        this.state = {character:null, new:false}
    }

    returnLoaded(character){
        this.setState({character:character})
    }

    submitNewGeneral(name, race, charClass, background, campaign){

    }

    render(){
        return(<>
            {((this.state.character===null)&&(this.characterID!==null)) ? <LoadCharacter ID={this.characterID} return={this.returnLoaded}/> : <CharacterInfo new={this.state.new} user={this.user} submitNewGeneral={this.submitNewGeneral}/>}
            <button onClick={this.props.back}>Back</button>
        </>)
    }
}

function LoadCharacter(props){
    const {loading, data, error} = useQuery(getCharacter, {variables:{id:props.ID}, fetchPolicy:'network-only'})
    while(loading){
        return(<p>loading...</p>)
    }
    if(error){//no need to print errors here, as they wont. just if data && data.variable
        return(<p>{error}</p>)
    }else{
        props.return(data.character)
        return(<p>done</p>)
    }
}

function CharacterInfo(props){
    const [page, changePage] = useState(0)
    let pages = [
        (props.new ? <NewGeneralInfo user={props.user} submit={props.submitNewGeneral}/>:<p>awaiting implementation (existing user general info)</p>),
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
    const {loading:raceLoading, data:raceData} = useQuery(getRaces)
    const {loading:classLoading, data:classData} = useQuery(getClasses)
    const [name, changeName] = useState("")
    const [bgInfo, changeBG] = useState("")
    const [race, changeRace] = useState("")
    const [charClass, changeClass] = useState("")
    const [campaign, changeCampaign] = useState("")
    while(raceLoading||classLoading){
        return(<p>Loading...</p>)
    }
    return (<form onSubmit={props.submit(name, race, charClass, bgInfo, campaign)}>
        <input type="submit" /><br/>
        <label htmlFor="name" className="tbLabel">Name: 
        <input type="name" id="name" name="name" required={true} onChange={(e)=>{e.preventDefault();changeName(e.target.value)}} value={name}/></label>
        <label>Campaign:
        <CampaignSelect id="campaign" campaigns={props.user.campaigns} changeCampaign={changeCampaign}/></label><br/>
        <label htmlFor="bg" className="tbLabel">Background Info / Lore: 
        <textarea id="bg" name="bg" onChange={(e)=>{e.preventDefault();changeBG(e.target.value)}} value={bgInfo} rows="4" cols="50" maxLength="500"/></label><br/>
        <label>Class:
        <ClassSelect id="class" classes={classData.classes} changeClass={changeClass}/></label>
        <label htmlFor="race" className="tbLabel">Race: 
        <RaceSelect id="race" races={raceData.races} changeRace={changeRace}/></label><br/>
    </form>)
}

function ClassSelect(props){
    const [selected, changeSelected] = useState(0)
    let classOptions = arrayToOptions(props.classes)
    return(
        <div>
            <select id="classes" name="classes" onChange={(e)=>{props.changeClass(props.classes[e.target.selectedIndex].index); changeSelected(e.target.selectedIndex)}}>
                {classOptions}
            </select>
            <p>{props.classes[selected].alignment}</p>
        </div>
    )
}

function RaceSelect(props){
    const [selected, changeSelected] = useState(0)
    let raceOptions = arrayToOptions(props.races)
    return(
        <div>
            <select id="races" name="races" onChange={(e)=>{props.changeRace(props.races[e.target.selectedIndex].index); changeSelected(e.target.selectedIndex)}}>
                {raceOptions}
            </select>
            <p>{props.races[selected].alignment}</p>
        </div>
    )
}

function CampaignSelect(props){
    const campaignOptions = arrayToOptions(props.campaigns)
    return(<>
        <select id="campaigns" name="campaigns" onChange={(e)=>{props.changeCampaign(props.campaigns[e.target.selectedIndex]._id)}}>
            {campaignOptions}
        </select>
    </>)
}
