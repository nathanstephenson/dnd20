import React, { useContext, useEffect, useState } from 'react'
import './Map.css'
import { UserContext } from '../../misc/UserContext'
import { useMutation } from '@apollo/client'
import { changeCharacterPos } from '../../queries'
import { Int32 } from 'bson'

export function Map(props){
    const {user} = useContext(UserContext)
    const session = props.session
    const w = 20
    const h = 15
    const pWidth = 35
    const [rows, setRows] = useState()
    const [changePos, {data, loading}] = useMutation(changeCharacterPos)
    let grid = []

    useEffect(()=>{
        function select(e){
            const squareOccupied = e.target.id!==""
            const square = e.target
            console.log(square)
            const n = Number.parseInt(e.target.attributes.name.value)
            const playersHere = props.session.characters.filter(el => el.position===n)
            if(!squareOccupied){
                changePos({variables: {session:session._id, character:props.character, position:n}})
            }else if(square.id===props.character){
                alert("that's me")
            }else if(playersHere.length>0){
                alert("that's "+playersHere[0].character.name)
            }else{
                alert("obstructed")
            }
        }
        function hover(e){
            const squareOccupied = e.target.id!==""
            const style = document.querySelector(':root').style
            if(squareOccupied){
                style.setProperty('--hover', 'var(--hover-bad)')
            }else{
                style.setProperty('--hover', 'var(--hover-good)')
            }
        }

        for(let row=0;row<h;row++){
            let line = []
            for(let column=0;column<w;column++){//each square in the grid
                let initial = ""
                let image = ""
                const i = row*w + column
                const here = props.session.characters.filter(el => el.position===i)
                if(here.length>0){
                    console.log(here, here[0].position)
                    initial = here[0].character.name[0]
                    if(initial === "D"){
                        image = "images/Nooth_DnD.png"
                    }
                    //image = "images/Nooth_DnD.png"
                }else{
                    initial = ""
                    image = ""
                }
                function getID(){
                    if(here.length>0){
                        return here[0]._id
                    }else{
                        return ""
                    }
                }
                line.push(
                    <div width={pWidth} height={pWidth} className="square">
                        <svg width={pWidth} height={pWidth} className="grid-square"><g>
                            <rect width={pWidth} height={pWidth} className="grid-square-bg"/>
                            <text x={pWidth/5} y={pWidth/1.4} fill="black">{initial}</text> 
                            <image href={image} width={pWidth-1} height={pWidth-1}/>
                            <rect width={pWidth} height={pWidth} id={getID()} name={i} className="grid-square-fg" onMouseOver={hover} onClick={select}/>
                        </g></svg>
                    </div>
                )
            } 
            grid.push(<div width={w*pWidth} height={pWidth} className="row">{line}</div>)
        }
        setRows(grid)
    },[session])
    
    /* useEffect(()=>{
        const grid = document.getElementById("grid")
        if(window.innerWidth>=window.innerHeight){
            grid.setAttribute("transform", "rotate(0)")
        }else{
            grid.setAttribute("transform", "rotate(45)")
        }
        console.log(grid)
    },[]) */
    return (
        <>
            <div width={w*pWidth} height={h*pWidth} id="grid" className="grid">{rows}</div>
        </>
    )
}