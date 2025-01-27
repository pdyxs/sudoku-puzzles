import RulesHtml from "./rules.md";
import MsgCorrectHTML from "./msgcorrect.md"
import { convert } from "html-to-text";

export function processPuzzle(data) {
    addRules(data);
    addMsgCorrect(data);
    // createSkyscraperFogTriggers(data);
    return data;
}

function addRules(data) {
    data.metadata.rules = convert(RulesHtml, {wordwrap: false});
}

function addMsgCorrect(data) {
    if (MsgCorrectHTML.length > 0) {
        data.metadata.msgcorrect = convert(MsgCorrectHTML, {wordwrap: false});
    }
}

function getSolutionArray(data) {
    // Remove any non-digit characters if needed
    const cleanedString = data.metadata.solution.replace(/\D/g, '');
    
    // Ensure the string has exactly 81 characters (9x9 grid)
    if (cleanedString.length !== 81) {
        throw new Error('Input string must be exactly 81 digits long');
    }
    
    // Create the 9x9 grid
    const grid = [];
    
    for (let i = 0; i < 9; i++) {
        // Extract a slice of 9 digits for each row
        const row = cleanedString
            .slice(i * 9, (i + 1) * 9)
            .split('')
            .map(Number);
        
        grid.push(row);
    }
    
    return grid;
}

function cell(r, c) {
    return `r${r+1}c${c+1}`;
}

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

    return cells.map(({r,c}) => cell(r,c)).join(",");
}

function createSkyscraperFogTriggers(data) {
    const grid = getSolutionArray(data);
    const triggers = [];
    
    for (let r = 0; r != 9; ++r) {
        for (let c = 0; c != 9; ++c) {
            triggers.push({
                trigger: {
                    type: 'cellvalue',
                    cell: cell(r,c)
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