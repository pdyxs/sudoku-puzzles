const THICKNESS = 2.5;
const PADDING = 0.025;

export function hideGridOutside(data, [startRow, endRow], [startCol, endCol]) {
    const gridHeight = data.cells.length;
    const gridWidth = data.cells[0].length;

    if (data.lines === undefined) {
        data.lines = [];
    }

    for (let r = 0; r !== gridHeight + 1; ++r) {
        //full rows
        if (r < startRow || r > endRow + 1) {
            data.lines.push({
                wayPoints: [[r, 0], [r, gridWidth]],
                color: "#FFFFFF",
                thickness: THICKNESS,
                "stroke-linecap": "butt",
                target: "overlay"
            });
        } else {

            if (startCol > 0) {
                data.lines.push({
                    wayPoints: [[r, 0], [r, startCol - PADDING]],
                    color: "#FFFFFF",
                    thickness: THICKNESS,
                    "stroke-linecap": "butt",
                    target: "overlay"
                })
            }

            if (endCol + 1 < gridWidth) {
                data.lines.push({
                    wayPoints: [[r, endCol + 1 + PADDING], [r, gridWidth]],
                    color: "#FFFFFF",
                    thickness: THICKNESS,
                    "stroke-linecap": "butt",
                    target: "overlay"
                })
            }
        }
    }

    for (let c = 0; c !== gridWidth + 1; ++c) {
        //full columns
        if (c < startCol || c > endCol + 1) {
            data.lines.push({
                wayPoints: [[0, c], [gridHeight, c]],
                color: "#FFFFFF",
                thickness: THICKNESS,
                "stroke-linecap": "butt",
                target: "overlay"
            });
        } else {
            if (startRow > 0) {
                data.lines.push({
                    wayPoints: [[0, c], [startRow - PADDING, c]],
                    color: "#FFFFFF",
                    thickness: THICKNESS,
                    "stroke-linecap": "butt",
                    target: "overlay"
                })
            }

            if (endRow + 1 < gridHeight) {
                data.lines.push({
                    wayPoints: [[endRow + 1 + PADDING, c], [gridHeight, c]],
                    color: "#FFFFFF",
                    thickness: THICKNESS,
                    "stroke-linecap": "butt",
                    target: "overlay"
                })
            }
        }
    }
}