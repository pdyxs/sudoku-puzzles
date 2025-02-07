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
    rules,
    msgCorrect: "",
    preamble
};