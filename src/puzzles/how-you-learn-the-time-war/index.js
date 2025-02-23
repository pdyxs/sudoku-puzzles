import rawRules from "./rules.md";
import msgCorrect from "./msgcorrect.md";
import preamble from "./preamble.md";
import puzzle from "./puzzle.json";
import { addMsgCorrect, addRules, replaceRules } from "../../processing/messages";
import { generateRowCols } from "../../processing/rowcol";

const rules = replaceRules(rawRules);

export default {
    puzzle,
    process: (data) => {
        addRules(data, rules);
        addMsgCorrect(data, msgCorrect);
        generateRowCols(data, [0,5], [0,5]);
        return data;
    },
    rules,
    msgCorrect,
    preamble,
};