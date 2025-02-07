import { cellsStr, cellStr, getSolutionArray } from "./utils";

function getSkyscrapersInDirection(grid, r, c, dr, dc) {
    let maxNumber = 0;
    const cells = [];
    for (
        let tr = r + dr, tc = c + dc; 
        tr >= 0 && tc >= 0 && tr < grid.length && tc < grid[0].length;
        tr += dr, tc += dc
    ) {
        if (grid[tr][tc] > maxNumber) {
            cells.push({r: tr, c: tc});
            maxNumber = grid[tr][tc];
        }
        if (maxNumber === 9) break;
    }
    return cells;
}

function getSkyscraperCellsFrom(grid, r, c) {
    const cells = [
        {r,c},
        ...getSkyscrapersInDirection(grid, r, c, 1, 0),
        ...getSkyscrapersInDirection(grid, r, c, -1, 0),
        ...getSkyscrapersInDirection(grid, r, c, 0, 1),
        ...getSkyscrapersInDirection(grid, r, c, 0, -1),
    ];

    return cellsStr(cells, ",");
}

export function createSkyscraperFogTriggers(data) {
    const grid = getSolutionArray(data);
    const triggers = [];
    
    for (let r = 0; r != 9; ++r) {
        for (let c = 0; c != 9; ++c) {
            triggers.push({
                trigger: {
                    type: 'cellvalue',
                    cell: cellStr(r,c)
                },
                effect: {
                    type: 'foglight',
                    cells: getSkyscraperCellsFrom(grid, r, c)
                }
            });
        }
    }

    data.triggereffect = triggers;
}