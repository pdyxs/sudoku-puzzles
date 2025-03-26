import * as allTexts from "./*.md";
import puzzle from "./puzzle.json";
import { addMsgCorrect, addRules, replaceImages, replaceRules, replaceUrls, setupTexts } from "~/src/processing/messages";
import { generateRowCols } from "~/src/processing/rowcol";
import { hideGridOutside } from "~/src/processing/hide-grid";
import howTheTimeWarWorksUnsolved from "../how-the-time-war-works-unsolved";
import howTheTimeWarWorksSolved from "../how-the-time-war-works-solved";

const texts = setupTexts(allTexts);

replaceUrls(texts.preamble,
    [["full-puzzle-url", "https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000M70"]]
);

const urls = [
    ["sample-url", howTheTimeWarWorksUnsolved.sudokupad],
    ["solution-url", howTheTimeWarWorksSolved.sudokupad]
];

replaceUrls(texts.rulesPostSudokupad, urls);
replaceUrls(texts.rulesPostHtml, urls);

replaceImages(texts.rulesPostHtml, [
    ["unsolved", howTheTimeWarWorksUnsolved.imgId],
    ["solved", howTheTimeWarWorksSolved.imgId]
])

texts.rulesPostHtml.default = texts.rulesPostHtml.default.replaceAll(
    "<table",
    '<table style="max-width: 500px"'
);

export const rulesPosts = {
    sudokupad: texts.rulesPostSudokupad,
    html: texts.rulesPostHtml
};

replaceRules(texts.rules);
const rules = texts.rules.default;

const sudokupad = "https://sudokupad.app/pdyxs/this-is-how-you-learn-the-time-war";
const lmd = "https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000M6F";

export default {
    puzzle,
    process: (data) => {
        addRules(data, rules + texts.rulesPostSudokupad.default);
        addMsgCorrect(data, texts.msgcorrect.default);
        hideGridOutside(data, [0, 5], [0, 5]);
        generateRowCols(data, [0, 5], [0, 5]);

        const padding = 0.1;

        for (let c = 1; c !== data.cells[0].length; ++c) {
            data.lines.push({
                wayPoints: [[7 + padding, c], [8 - padding, c]],
                color: "#543af8ff",
                thickness: 0.75,
                target: "overlay",
                "stroke-dasharray": "5 3",
                "stroke-dashcorner": "4"
            });
        }

        for (let c = 1; c !== data.cells[0].length; ++c) {
            data.lines.push({
                wayPoints: [[8 + padding, c], [9 - padding, c]],
                color: "#f51919ff",
                thickness: 0.75,
                target: "overlay",
                "stroke-dasharray": "5 3",
                "stroke-dashcorner": "4"
            });
        }

        return data;
    },
    ...texts,
    imgId: "000TBV",
    sudokupad,
    lmd
};