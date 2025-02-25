import rawRules from "./rules.md";
import msgCorrect from "./msgcorrect.md";
import preamble from "./preamble.md";
import puzzle from "./puzzle.json";
import { addMsgCorrect, addRules, replaceRules } from "../../processing/messages";
import { generateRowCols } from "../../processing/rowcol";
import { hideGridOutside } from "../../processing/hide-grid";
import howTheTimeWarWorksUnsolved from "../how-the-time-war-works-unsolved";
import howTheTimeWarWorksSolved from "../how-the-time-war-works-solved";

const rules = replaceRules(
    rawRules.replace('href="sample-url"', `href="${howTheTimeWarWorksUnsolved.sudokupad}"`)
            .replace('href="solution-url"', `href="${howTheTimeWarWorksSolved.sudokupad}"`)
);

export default {
    puzzle,
    process: (data) => {
        addRules(data, rules);
        addMsgCorrect(data, msgCorrect);
        hideGridOutside(data, [0,5], [0,5]);
        generateRowCols(data, [0,5], [0,5]);

        const padding = 0.1;

        for (let c = 1; c !== data.cells[0].length; ++c) {
            data.lines.push({
                wayPoints: [[7 + padding, c], [8 - padding, c]],
                color: "#543af8ff",
                thickness: 0.75,
                target: "overlay",
                "stroke-dasharray": "5 3",
                "stroke-dashcorner": "4"
            });
        }

        for (let c = 1; c !== data.cells[0].length; ++c) {
            data.lines.push({
                wayPoints: [[8 + padding, c], [9 - padding, c]],
                color: "#f51919ff",
                thickness: 0.75,
                target: "overlay",
                "stroke-dasharray": "5 3",
                "stroke-dashcorner": "4"
            });
        }

        return data;
    },
    rules,
    msgCorrect,
    preamble,
};