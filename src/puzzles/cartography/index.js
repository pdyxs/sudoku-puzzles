import rules from "./rules.md";
import msgCorrect from "./msgcorrect.md";
import post from "./post.md";
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
    post,
    preamble
};