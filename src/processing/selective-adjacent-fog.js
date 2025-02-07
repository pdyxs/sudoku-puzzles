import { cellsStr, cellStr } from "./utils";

function getAdjacentRevealableCells(or, oc, revealableArray) {
    const cells = [];

    for (let r = Math.max(0, or - 1); r !== Math.min(revealableArray.length, or + 2); ++r) {
        for (let c = Math.max(0, oc - 1); c !== Math.min(revealableArray[r].length, oc + 2); ++c) {
            if (revealableArray[r][c] === 1) {
                cells.push({r, c});
            }
        }
    }

    return cellsStr(cells);
}

export function createAdjacentRevealableFogTriggers(data, revealableArray) {
    let triggers = [];

    for (let r = 0; r !== revealableArray.length; ++r) {
        for (let c = 0; c !== revealableArray[r].length; ++c) {
            if (revealableArray[r][c] === 0)
                continue;

            triggers.push({
                trigger: {
                    type: 'cellvalue',
                    cell: cellStr(r,c)
                },
                effect: {
                    type: 'foglight',
                    cells: getAdjacentRevealableCells(r, c, revealableArray)
                }
            });
        }
    }

    data.triggereffect = triggers;
}
