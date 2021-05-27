const {RESTDataSource} = require('apollo-datasource-rest');
const e = require('express');


async function expandAPIRef(array, sender){ //sender is used for "get" method
    let newarray = []
    for await(let element of array) {
        if (element != undefined ) {
            if (isAPIRef(element)){
                //console.log("expanding ref")
                element = await sender.get(element.url)
            } else {
                for (const e in element){
                    if (Array.isArray(element[e])){
                        //console.log("expanding multiple")
                        element[e] = await expandAPIRef(element[e], sender)
                        //console.log(element[e])
                    } else if (isAPIRef(element[e])){
                        //console.log("expanding single", element[e])
                        const expanded = await expandAPIRef([element[e]], sender)
                        element[e] = expanded[0]
                        //console.log("expanded", element[e])
                    }
                }
            } 
            newarray.push(element)
        } //console.log(element)
    }
    //console.log(newarray)
    return newarray
}

function isAPIRef(object){
    const exampleAPIRef = {
        index: "String",
        name: "String",
        url: "String",
    }
    let matching = 0
    for (property in object){
        if (exampleAPIRef.hasOwnProperty(property)){
            matching += 1
        } else {
            matching -= 1
        }
    }
    if (matching == 3) {
        return true
    } else {
        return false
    }
}



module.exports = {isAPIRef,  expandAPIRef}