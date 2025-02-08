import rules from "./rules.md";
import preamble from "./preamble.md";
import puzzle from "./puzzle.json";
import { addRules } from "../../processing/messages";

export default {
    puzzle,
    process: (data) => {
        addRules(data, rules);
        return data;
    },
    rules: rules,
    msgCorrect: "",
    preamble,
    lmd: "https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000LE5",
    imgId: "000SCV",
    sudokupad: "https://sudokupad.app/rvs0kjqaw5",
};