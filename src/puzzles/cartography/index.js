import rules from "./rules.md";
import msgCorrect from "./msgcorrect.md";
import preamble from "./preamble.md";
import puzzle from "./puzzle.json";
import { addMsgCorrect, addRules } from "../../processing/messages";
import { createSkyscraperFogTriggers } from "../../processing/skyscraper-fog";

export default {
    puzzle,
    process: (data) => {
        addRules(data, rules);
        addMsgCorrect(data, msgCorrect);
        createSkyscraperFogTriggers(data);
        return data;
    },
    rules,
    msgCorrect,
    preamble,
    lmd: "https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000LRL",
    imgId: "000STE",
    sudokupad: "https://sudokupad.app/210jn6fmnj",
};