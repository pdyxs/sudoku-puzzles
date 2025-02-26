import * as rawRules from "../how-the-time-war-works-unsolved/rules.md";
import puzzle from "./puzzle.json";
import { addRules, replaceRules } from "../../processing/messages";
import { generateRowCols } from "../../processing/rowcol";
import { hideGridOutside } from "../../processing/hide-grid";

replaceRules(rawRules);
const rules = rawRules.default;

export default {
    puzzle,
    process: (data) => {
        addRules(data, rules);
        hideGridOutside(data, [0,3], [0,3]);
        generateRowCols(data, [0,3], [0,3]);

        const padding = 0.1;

        for (let c = 1; c !== data.cells[0].length; ++c) {
            data.lines.push({
                wayPoints: [[5 + padding, c], [6 - padding, c]],
                color: "#543af8ff",
                thickness: 0.75,
                target: "overlay",
                "stroke-dasharray": "5 3",
                "stroke-dashcorner": "4"
            });
        }

        for (let c = 1; c !== data.cells[0].length; ++c) {
            data.lines.push({
                wayPoints: [[6 + padding, c], [7 - padding, c]],
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
    imgId: "000TBU",
    sudokupad: "https://sudokupad.app/dd7g5pcp3b"
};