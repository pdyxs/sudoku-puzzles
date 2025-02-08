import rules from "./rules.md";
import htmlRules from "./htmlRules.md";
import preamble from "./preamble.md";
import puzzle from "./puzzle.json";
import { addRules } from "../../processing/messages";

export default {
    puzzle,
    process: (data) => {
        addRules(data, rules);
        return data;
    },
    rules: htmlRules + rules,
    msgCorrect: "",
    preamble,
    lmd: "https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000LL7",
    sudokupad: "https://sudokupad.app/tc5dhvo13g",
    imgId: "000SLQ",
};