import * as allTexts from "./*.md";
import puzzle from "./puzzle.json";
import { addMsgCorrect, addRules, replaceRules, setupTexts } from "~/src/processing/messages";

const texts = setupTexts(allTexts);

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
    lmd: "https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000MFZ",
    imgId: "000TP7",
};