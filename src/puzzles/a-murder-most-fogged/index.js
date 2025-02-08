import rules from "./rules.md";
import msgCorrect from "./msgcorrect.md";
import preamble from "./preamble.md";
import puzzle from "./puzzle.json";
import { addMsgCorrect, addRules } from "../../processing/messages";

export default {
    puzzle,
    process: (data) => {
        addRules(data, rules);
        addMsgCorrect(data, msgCorrect);
        return data;
    },
    rules,
    msgCorrect,
    preamble,
    lmd: "https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000LQI",
    imgId: "000SRO",
    sudokupad: "https://sudokupad.app/13ifkj2xvl",
};