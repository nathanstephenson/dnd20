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
    const pWidth = 30
    const [rows, setRows] = useState()
    const [changePos, {data, loading}] = useMutation(changeCharacterPos)
    /* useEffect(()=>{
        const grid = document.getElementById("grid")
        if(window.innerWidth>=window.innerHeight){
            grid.setAttribute("transform", "rotate(0)")
        }else{
            grid.setAttribute("transform", "rotate(45)")
        }
        //grid.appendChild(rows)
        console.log(grid)
    },[rows]) */
    useEffect(()=>{
        var i = 1
        let grid = []
        for(let row=1;row<=h;row++){
            let row = []
            for(let column=1;column<=w;column++){//each square in the grid
                const occupied = i===4
                row.push(
                    <div width={pWidth} height={pWidth} className="square">
                        <svg width={pWidth} height={pWidth} className="grid-square"><g>
                            <rect width={pWidth} height={pWidth} id="rec" name={"bg"} className="grid-square-bg"/>
                            <text width={pWidth} height={pWidth}>W</text> 
                            {occupied && <image href="images/Nooth_DnD.png" width={pWidth-1} height={pWidth-1}/>}
                            <rect width={pWidth} height={pWidth} id="rec" name={i} innerHTML={column} className="grid-square-fg" onClick={select}/>
                        <p>W</p></g></svg>
                    </div>
                )
                i = i+1
            } 
            grid.push(<div width={w*pWidth} height={pWidth} className="row">{row}</div>)
        }
        setRows(grid)
    },[])
    function select(e){
        const n = Number.parseInt(e.target.attributes.name.value)
        console.log(n)
    }
    return (
        <>
            <div width={w*pWidth} height={h*pWidth} id="grid" className="grid">{rows}</div>
        </>
    )
}