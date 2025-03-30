import { addRows } from "~/src/processing/expand-grid";
import * as allTexts from "./*.md";
import puzzle from "./puzzle.json";
import { addMsgCorrect, addRules, replaceRules, setupTexts } from "~/src/processing/messages";
import { generateRowCols } from "~/src/processing/rowcol";
import { hideGridOutside } from "~/src/processing/hide-grid";
import { addSpaceTimeArrows } from "~/src/processing/spacetime-arrows";

const texts = setupTexts(allTexts);

replaceRules(texts.rules);

export default {
    puzzle,
    process: (data) => {
        addRules(data, texts.rules.default);
        addMsgCorrect(data, texts.msgcorrect.default);
        addRows(data, 3);
        hideGridOutside(data, [0, 5], [0, 5]);

        let cageRow = 8;
        const padding = 0.1;
        data.cages.forEach(cage => {
            data.cages.push({
                ...cage,
                cells: Array.from({ length: cage.cells.length }, (_, i) => [cageRow, i])
            })

            for (let c = 1; c !== data.cells[0].length; ++c) {
                data.lines.push({
                    wayPoints: [[cageRow + padding, c], [cageRow + 1 - padding, c]],
                    color: cage.outlineC,
                    thickness: 0.75,
                    target: "overlay",
                    "stroke-dasharray": "5 3",
                    "stroke-dashcorner": "4"
                });
            }

            cageRow--;
        });

        generateRowCols(data, [0, 5], [0, 5]);

        addSpaceTimeArrows(data, 6);

        return data;
    },
    ...texts,
    imgId: "000TXS",
    sudokupad: "https://sudokupad.app/pdyxs/times-apart",
    lmd: "https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000MMV"
};