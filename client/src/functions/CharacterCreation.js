export function levelsAreBalanced(levels){//input an array [str, dex, con, int, wis, cha]
    return (0 <= getRemainingLevelPoints(levels) && getRemainingLevelPoints(levels) <= 25) ? true : false
}

export function getRemainingLevelPoints(levels){
    let remaining = 25
    levels.map((value)=>{
        switch(value) {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14:
                remaining -= (value - 8)
                break
            case 15:
                remaining -= 8
                break
            case 16:
                remaining -= 10
                break
            case 17:
                remaining -= 13
                break
            case 18:
                remaining -= 18
                break
            default:
                remaining -= 100
                break
        }
    })
    return remaining
}