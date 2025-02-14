import rules from "./rules.md";
import msgCorrect from "./msgcorrect.md";
import preamble from "./preamble.md";
import puzzle from "./puzzle.json";
import { addMsgCorrect, addRules } from "../../processing/messages";
import { createAdjacentRevealableFogTriggers } from "../../processing/selective-adjacent-fog";

const unshadedArray = [
    [1, 1, 1,   0, 0, 0,   0, 0, 0],
    [1, 0, 1,   0, 1, 1,   0, 1, 0],
    [1, 0, 0,   0, 0, 1,   1, 1, 0],

    [1, 1, 1,   0, 1, 1,   0, 0, 0],
    [1, 0, 1,   1, 1, 0,   0, 1, 0],
    [1, 0, 0,   1, 0, 0,   1, 1, 0],
    
    [1, 1, 0,   1, 1, 1,   1, 0, 0],
    [1, 0, 0,   0, 0, 0,   1, 1, 0],
    [1, 1, 1,   1, 1, 0,   0, 0, 0]
];

export default {
    puzzle,
    process: (data) => {
        addRules(data, rules);
        addMsgCorrect(data, msgCorrect);
        createAdjacentRevealableFogTriggers(data, unshadedArray);
        return data;
    },
    rules,
    msgCorrect,
    preamble,
    imgId: "000T0R",
    lmd: "https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000LXM",
    sudokupad: "https://sudokupad.app/otswx1r68x",
};