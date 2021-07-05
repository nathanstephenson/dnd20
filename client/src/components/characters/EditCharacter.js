import React, {useContext, useEffect, useState} from 'react'
import {useQuery, useLazyQuery, useMutation} from '@apollo/client'
import '../../App.css'
import {addCharacter, deleteCharacter, getCharacter, getClasses, getClass, getRaces, updateCharacterInfo, updateCharacterStats} from '../../queries'
import { arrayToOptions } from '../../functions/GeneralFunctions'
import { UserContext } from '../../misc/UserContext'
import { levelsAreBalanced, getRemainingLevelPoints } from '../../functions/CharacterCreation'



export default function EditCharacter(props){
    const user = props.currentUser
    const [character, updateCharacter] = useState(null)
    const {loading, data, refetch: reloadCharacter} = useQuery(getCharacter, {variables:{id:props.characterID}, fetchPolicy:'network-only'})
    useEffect(()=>{
        if (loading===false && data!==undefined){
            updateCharacter(data.character)
        }
    }, [data, loading, props.characterID])
    while(loading){
        return(<p>Loading...</p>)
    }
    return(<>
        <button className="backButton" onClick={props.back}>Back</button>{/* vvv unloaded and unentered*/}
        {loading===false && (character!==null ? <CharacterInfo user={user} character={character} reload={reloadCharacter} back={props.back}/> : <NewGeneralInfo user={user} back={props.back}/>)}
    </>)
}

function NewGeneralInfo(props){
    const [name, changeName] = useState("")
    const [background, changeBG] = useState("")
    const [race, changeRace] = useState("")
    const [campaign, changeCampaign] = useState("")
    const {loading:raceLoading, data:raceData} = useQuery(getRaces)
    const [createNew, {loading:newLoading, data:newData}] = useMutation(addCharacter)
    useEffect(()=>{
        if (props.user.campaigns[0]!==undefined){
            changeCampaign(props.user.campaigns[0]._id)
        }
        if(raceData!==undefined){
            if (raceData.races[0]!==undefined){
                changeRace(raceData.races[0].index)
            }
        }
    },[raceData, props.user.campaigns])
    while(raceLoading||newLoading){
        return(<p>Loading...</p>)
    }
    if(newData!==undefined){
        props.back()
    }
    return (<form onSubmit={()=>{console.log(props.user._id, campaign, name, race, background);createNew({variables:{user:props.user._id, campaign:campaign, name:name, race:race, background:background}})}}>
        <input type="submit" /><br/>
        <label htmlFor="name" className="tbLabel">Name: 
        <input type="name" id="name" name="name" required={true} onChange={(e)=>{e.preventDefault();changeName(e.target.value)}} value={name}/></label>
        <CampaignSelect id="campaign" campaigns={props.user.campaigns} changeCampaign={changeCampaign}/><br/>
        <label htmlFor="bg" className="tbLabel">Background Info / Lore: 
        <textarea id="bg" name="bg" onChange={(e)=>{e.preventDefault();changeBG(e.target.value)}} value={background} rows="4" cols="50" maxLength="500"/></label><br/>
        <RaceSelect id="race" races={raceData.races} changeRace={changeRace}/><br/>
    </form>)
}

function CharacterInfo(props){
    console.log(props.character)
    const {loading:classLoading, data:classData} = useQuery(getClasses)
    const [page, changePage] = useState(0)
    while(classLoading){
        return(<p>Loading...</p>)
    }
    let pages = <>{[
            page===0 && <ExistingGeneralInfo character={props.character} classes={classData.classes} back={props.back}/>,
            page===1 && <Proficiencies character={props.character}/>
        ]}<p className="Form">Page:
            <button onClick={()=>{changePage(0)}}>1</button>
            <button onClick={()=>{changePage(1)}}>2</button>
        </p></>
    return (<div><h2>{props.character.name}</h2>
        <div className="Form">{pages}</div>
    </div>)
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
    const [badStats, setBadStats] = useState(false)
    const levels = [str, dex, con, int, wis, cha]
    const [remainingLevelPoints, setRemaining] = useState(getRemainingLevelPoints(levels))

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
    return (<><div>
        <button onClick={delCharacter}>Delete Character</button></div>
        {rename ? <>
            <form onSubmit={updateInfo}>
                <label htmlFor="name" className="tbLabel">Name: 
                <input type="text" id="name" name="name" required={true} onChange={(e)=>{e.preventDefault();changeName(e.target.value)}} value={name}/></label>
                <CampaignSelect id="campaign" current={campaign} campaigns={user.campaigns} changeCampaign={changeCampaign}/>
                <input type="submit"/><button onClick={()=>{toggleRename(!rename)}}>Cancel</button>
            </form>
        </> : <><button onClick={()=>{toggleRename(!rename)}}>Rename/ChangeCampaign</button><br/></>}
        <form className="Form" onSubmit={()=>{if(levelsAreBalanced([str, dex, con, int, wis, cha])){updateStats();setBadStats(false)}else{setBadStats(true)}}}>
            <input type="submit" /><br/>
            <ClassSelect id="class" current={charClass} classes={props.classes} changeClass={changeClass}/><br/>
            <label htmlFor="str" className="tbLabel">Str: 
            <input type="number" id="str" name="str" min="1" max="20" required={true} onChange={(e)=>{const newLevelsStr = [str + (Number.parseInt(e.target.value) - str), dex, con, int, wis, cha];e.preventDefault();if(levelsAreBalanced(newLevelsStr)){changeStr(Number.parseInt(e.target.value));setRemaining(getRemainingLevelPoints(newLevelsStr))}else{e.target.innerText = str}}} value={str}/></label>
            <label htmlFor="dex" className="tbLabel">Dex: 
            <input type="number" id="dex" name="dex" min="1" max="20" required={true} onChange={(e)=>{const newLevelsDex = [str, dex + (Number.parseInt(e.target.value) - dex), con, int, wis, cha];e.preventDefault();if(levelsAreBalanced(newLevelsDex)){changeDex(Number.parseInt(e.target.value));setRemaining(getRemainingLevelPoints(newLevelsDex))}else{e.target.innerText = dex}}} value={dex}/></label>
            <label htmlFor="con" className="tbLabel">Con: 
            <input type="number" id="con" name="con" min="1" max="20" required={true} onChange={(e)=>{const newLevelsCon = [str, dex, con + (Number.parseInt(e.target.value) - con), int, wis, cha];e.preventDefault();if(levelsAreBalanced(newLevelsCon)){changeCon(Number.parseInt(e.target.value));setRemaining(getRemainingLevelPoints(newLevelsCon))}else{e.target.innerText = con}}} value={con}/></label>
            <label htmlFor="int" className="tbLabel">Int: 
            <input type="number" id="int" name="int" min="1" max="20" required={true} onChange={(e)=>{const newLevelsInt = [str, dex, con, int + (Number.parseInt(e.target.value) - int), wis, cha];e.preventDefault();if(levelsAreBalanced(newLevelsInt)){changeInt(Number.parseInt(e.target.value));setRemaining(getRemainingLevelPoints(newLevelsInt))}else{e.target.innerText = int}}} value={int}/></label>
            <label htmlFor="wis" className="tbLabel">Wis: 
            <input type="number" id="wis" name="wis" min="1" max="20" required={true} onChange={(e)=>{const newLevelsWis = [str, dex, con, int, wis + (Number.parseInt(e.target.value) - wis), cha];e.preventDefault();if(levelsAreBalanced(newLevelsWis)){changeWis(Number.parseInt(e.target.value));setRemaining(getRemainingLevelPoints(newLevelsWis))}else{e.target.innerText = wis}}} value={wis}/></label>
            <label htmlFor="cha" className="tbLabel">Cha: 
            <input type="number" id="cha" name="cha" min="1" max="20" required={true} onChange={(e)=>{const newLevelsCha = [str, dex, con, int, wis, cha + (Number.parseInt(e.target.value) - cha)];e.preventDefault();if(levelsAreBalanced(newLevelsCha)){changeCha(Number.parseInt(e.target.value));setRemaining(getRemainingLevelPoints(newLevelsCha))}else{e.target.innerText = cha}}} value={cha}/></label>
            <p>{remainingLevelPoints} points remaining</p>
        </form>
        {badStats && <p>bad stats</p>}
    </>)
}

function Proficiencies(props){//works(only for first set of choices), just needs submit button
    const {data, loading} = useQuery(getClass, {variables:{index:props.character.class}})
    const [chosen, updateChosen] = useState(0)
    const [chosenOptions, changeChosen] = useState([])
    const [defaults, changeDefaults] = useState([])
    useEffect(()=>{
        if (!(data===null||data===undefined) && loading===false){
            changeChosen(data.class.proficiency_choices[0].from.map(()=>{return null}))
            changeDefaults(data.class.proficiencies.map((currentValue)=>{return currentValue.name}))
        }
    },[data, loading, props.classes])
    while(loading){
        return(<p>Loading data...</p>)
    }
    if (!(data===null||data===undefined) && loading===false){
        const charClass = data.class
        const options = charClass.proficiency_choices[0]
        function choose(checkbox){
            if(checkbox.checked){
                if(chosen+1 <= options.choose){
                    updateChosen(Number.parseInt(chosen+1))
                    changeChosen(chosenOptions.map((currentValue, index)=>{if(index === Number.parseInt(checkbox.name)){return checkbox.id}else{return currentValue}}))
                }else{
                    checkbox.checked = false
                }
            }else{
                updateChosen(chosen-1)
                changeChosen(chosenOptions.map((currentValue, index)=>{if(index === Number.parseInt(checkbox.name)){return null}else{return currentValue}}))
            }
        }
        const profOptions = options.from.map((currentValue, index)=>{
            return(<><input type="checkbox" name={index} id={currentValue.index} onChange={(e)=>{choose(e.target)}}/><label for={index}>{currentValue.name}</label></>)
        })
        return (<>
            <p>Choose {options.choose}:</p>
            <form>
                {profOptions}
            </form>
            <p>{defaults}</p>
        </>)
    }
    return(<p></p>)
}

function ClassSelect(props){
    let classOptions = arrayToOptions(props.classes, props.current)
    return(
        <label htmlFor="class" className="tbLabel">Class:
            <select id="classes" required={true} name="classes" onChange={(e)=>{props.changeClass(props.classes[e.target.selectedIndex].index)}} defaultValue={props.current}>
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
            <select id="campaigns" name="campaigns" selectedIndex="0" required={true} onChange={(e)=>{props.changeCampaign(props.campaigns[e.target.selectedIndex]._id)}} defaultValue={props.current}>
                {campaignOptions}
            </select>
        </label>
    </>)
}
