
export function generateRowCols(data, [startRow, endRow], [startCol, endCol]) {
    const rowCages = [];
    const colCages = [];
    for (let r = startRow; r <= endRow; ++r) {
        const rowCage = [];
        for (let c = startCol; c <= endCol; ++c) {
            rowCage.push([r, c]);

            if (colCages.length <= c - startCol) {
                colCages.push([]);
            }
            colCages[c - startCol].push([r,c]);
        }
        rowCages.push(rowCage);
    }

    const newCages = [];
    [...rowCages, ...colCages].forEach((cells) => {
        newCages.push({
            type: "rowcol",
            style: "",
            unique: "true",
            cells
        });
    });

    if (data.cages === undefined) {
        data.cages = newCages;
    } else {
        data.cages = [...data.cages, ...newCages];
    }

    data.metadata.norowcol = true;
}