import * as allTexts from "./*.md";
import puzzle from "./puzzle.json";
import { addMsgCorrect, addRules, replaceRules } from "~/src/processing/messages";

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

export default {
    puzzle,
    process: (data) => {
        addRules(data, texts.rules.default);
        addMsgCorrect(data, texts.msgcorrect.default);
        return data;
    },
    ...texts,
    sudokupad: "https://sudokupad.app/pdyxs/cityscrapers",
    lmd: "https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000MFZ&aktion=aktivieren",
    imgId: "000TP7",
};