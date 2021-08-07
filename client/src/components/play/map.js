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
            const n = Number.parseInt(e.target.attributes.name.value)
            changePos({variables: {session:session._id, character:props.character, position:n}})
        }
        for(let row=0;row<h;row++){
            let line = []
            for(let column=0;column<w;column++){//each square in the grid
                let image = ""
                const i = row*w + column
                const here = props.session.characters.filter(el => el.position===i)
                if(here.length>0){
                    console.log(here, here[0].position)
                    image = "images/Nooth_DnD.png"
                }else{
                    image = ""
                }
                const occupied = here.length>0
                line.push(
                    <div width={pWidth} height={pWidth} occupied={occupied} className="square">
                        <svg width={pWidth} height={pWidth} className="grid-square"><g>
                            <rect width={pWidth} height={pWidth} id="rec" name={"bg"} className="grid-square-bg"/>
                            <text width={pWidth} height={pWidth}>W</text> 
                            <image href={image} width={pWidth-1} height={pWidth-1}/>
                            <rect width={pWidth} height={pWidth} id="rec" name={i} className="grid-square-fg" onClick={select}/>
                        <p>W</p></g></svg>
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