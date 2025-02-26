import * as texts from "./*.md";
import puzzle from "./puzzle.json";
import { addMsgCorrect, addRules, replaceRules } from "../../processing/messages";
import { generateRowCols } from "../../processing/rowcol";

replaceRules(texts.rules);
const rules = texts.rules.default;
const msgCorrect = texts.msgcorrect.default;
const preamble = texts.preamble.default;

export default {
    puzzle,
    process: (data) => {
        addRules(data, rules);
        addMsgCorrect(data, msgCorrect);
        generateRowCols(data, [0, 8], [0, 8]);
        return data;
    },
    rules,
    msgCorrect,
    preamble,
};