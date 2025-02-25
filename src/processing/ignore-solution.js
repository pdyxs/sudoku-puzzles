function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

export function ignoreSolutionOutside(data, [startRow, endRow], [startCol, endCol]) {
    const gridHeight = data.cells.length;
    const gridWidth = data.cells[0].length;

    if (!data.metadata.solution) return;

    let newSoln = "";
    for (let r = 0; r !== gridHeight; ++r) {
        for (let c = 0; c !== gridWidth; ++c) {
            const index = r * gridWidth + c;
            if (r < startRow || r > endRow || c < startCol || c > endCol) {
                newSoln += "?";
            } else {
                if (data.metadata.solution.length > index) {
                    newSoln += data.metadata.solution.charAt(index);
                } else {
                    newSoln += ".";
                }
            }
        }
    }

    console.log(newSoln);
    data.metadata.solution = newSoln;

}