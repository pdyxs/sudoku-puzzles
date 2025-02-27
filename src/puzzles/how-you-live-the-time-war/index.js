import * as allTexts from "./*.md";
import puzzle from "./puzzle.json";
import { addMsgCorrect, addRules, createMarkdown, replaceRules } from "../../processing/messages";
import { generateRowCols } from "../../processing/rowcol";
import { hideGridOutside } from "../../processing/hide-grid";
import { rulesPosts } from "../how-you-learn-the-time-war";

const texts = Object.entries(allTexts).reduce((o, [name, text]) => {
    return {
        ...o,
        [name]: {
            default: text.default,
            raw: text.raw
        }
    }
}, {});

replaceRules(texts.rules);
const rules = texts.rules.default;
const msgCorrect = texts.msgcorrect.default;
const preamble = texts.preamble.default;

const sudokupad = "https://sudokupad.app/7mqh4sa9jo";
const lmd = "https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000M70";

const markdown = createMarkdown(
    puzzle.metadata.title, 
    texts.preamble.raw, 
    texts.rules.raw,
    sudokupad,
    lmd
)

export default {
    puzzle,
    process: (data) => {
        addRules(data, rules + rulesPosts.sudokupad.default);
        addMsgCorrect(data, msgCorrect);
        generateRowCols(data, [0, 8], [0, 8]);
        hideGridOutside(data, [0, 8], [0, 8]);

        //Cage Lines
        data.lines = data.lines || [];
        const padding = 0.1;

        for (let c = 1; c !== data.cells[0].length; ++c) {
            data.lines.push({
                wayPoints: [[10 + padding, c], [11 - padding, c]],
                color: "#543af8ff",
                thickness: 0.75,
                target: "overlay",
                "stroke-dasharray": "5 3",
                "stroke-dashcorner": "4"
            });
        }

        for (let c = 1; c !== data.cells[0].length; ++c) {
            data.lines.push({
                wayPoints: [[11 + padding, c], [12 - padding, c]],
                color: "#f51919ff",
                thickness: 0.75,
                target: "overlay",
                "stroke-dasharray": "5 3",
                "stroke-dashcorner": "4"
            });
        }

        //Anti-kropkis
        const kropkis = [
            [1, 3.5],
            [2, 3.5],
            [0.5, 7],
            [7, 1.5],
            [7, 2.5],
            [8, 2.5]
        ];
        data.overlays = data.overlays || [];
        kropkis.forEach(([r, c]) => {
            data.overlays.push({
                "center": [r, c],
                "width": 0.32,
                "height": 0.32,
                "thickness": 1.28,
                "angle": 0,
                "rounded": true,
                "backgroundColor": "#FFFFFF",
                "borderColor": "#000000"
            },{
                center: [r, c],
                width: 0.32,
                height: 0.07,
                backgroundColor: "#000",
                borderColor: "#00000000",
                target: "overlay",
                angle: 45
            },{
                center: [r, c],
                width: 0.32,
                height: 0.07,
                backgroundColor: "#000",
                borderColor: "#00000000",
                target: "overlay",
                angle: -45
            });
        });

        // for (let r = 0; r !== 8; ++r) {
        //     for (let c = 0; c !== 9; ++c) {
        //         data.cells[r][c] = {value: data.metadata.solution.charAt(r * 9 + c)};
        //     }
        // }

        return data;
    },
    rules: rules + rulesPosts.html.default,
    msgCorrect,
    preamble,
    markdown,
    sudokupad,
    imgId: "000TCL",
    lmd
};