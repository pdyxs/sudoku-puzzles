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
        return data;
    },
    rules,
    msgCorrect,
    preamble,
    sudokupad: "https://sudokupad.app/pdyxs/little-fillers-2",
    lmd: "https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000LS4",
    imgId: "000STZ",
};