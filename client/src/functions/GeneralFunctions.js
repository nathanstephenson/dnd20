export function arrayToOptions(array, selected){
    let newArray = []
    if(array[0]!==undefined){
        if(array[0].index!==undefined){
            for (let i=0; i<array.length; i++){
                newArray.push(<option value={array[i].index} key={i}>{array[i].name}</option>)
            }
        }else if (array[0]._id!==undefined){
            for (let i=0; i<array.length; i++){
                newArray.push(<option value={array[i]._id} key={i}>{array[i].name}</option>)
            }
        }
    }
    return newArray
}