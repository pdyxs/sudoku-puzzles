import rawRules from "./rules.md";
import msgCorrect from "./msgcorrect.md";
import preamble from "./preamble.md";
import puzzle from "./puzzle.json";
import { addMsgCorrect, addRules, replaceRules } from "../../processing/messages";

const rules = replaceRules(rawRules);

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
};