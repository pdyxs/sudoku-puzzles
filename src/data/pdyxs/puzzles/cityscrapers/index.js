import * as allTexts from "./*.md";
import puzzle from "./puzzle.json";
import { addMsgCorrect, addRules, createMarkdown, replaceRules } from "~/src/processing/messages";

const texts = Object.entries(allTexts).reduce((o, [name, text]) => {
    return {
        ...o,
        [name]: {
            default: text.default,
            raw: text.raw
        }
    }
}, {});

replaceRules(texts.rules);
const rules = texts.rules.default;
const msgCorrect = texts.msgcorrect.default;
const preamble = texts.preamble.default;
const sudokupad = "https://sudokupad.app/pdyxs/cityscrapers";
const lmd = "https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000MFZ&aktion=aktivieren";

const markdown = createMarkdown(
    puzzle.metadata.title,
    texts.preamble.raw,
    texts.rules.raw,
    sudokupad,
    lmd,
)

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
    markdown,
    sudokupad,
    lmd,
    imgId: "000TP7",
    solveguide: texts.solveguide.default,
};