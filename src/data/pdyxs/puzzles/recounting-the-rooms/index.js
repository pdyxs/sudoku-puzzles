import rules from "./rules.md";
import msgCorrect from "./msgcorrect.md";
import preamble from "./preamble.md";
import puzzle from "./puzzle.json";
import { addMsgCorrect, addRules } from "~/src/processing/messages";

export default {
    puzzle,
    process: (data) => {
        addRules(data, rules);
        addMsgCorrect(data, msgCorrect);
        
        for (let i = 1; i !== 11; ++i) {
            const wps1 = [
                [[0, i], [0.97, i]],
                [[i, 0], [i, 0.97]],
                [[11, i], [10.03, i]],
                [[i, 11], [i, 10.03]]
            ];

            data.lines.push(...wps1.map(wayPoints => ({
                wayPoints,
                color: "#AFAFAF",
                thickness: 1,
                target: "cell-grids"
            })));


            const wps2 = [
                [[0, i], [0.935, i]],
                [[i, 0], [i, 0.935]],
                [[11, i], [10.065, i]],
                [[i, 11], [i, 10.065]]
            ];
            data.lines.push(...wps2.map(wayPoints => ({
                wayPoints,
                color: "#FFFFFF",
                thickness: 5,
                target: "overlay"
            })));
        }

        
        return data;
    },
    rules,
    msgCorrect,
    preamble,
    lmd: "https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000M09",
    imgId: "000T43",
    sudokupad: "https://sudokupad.app/belm8cdujp"
};