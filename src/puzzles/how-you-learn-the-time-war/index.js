import * as allTexts from "./*.md";
import puzzle from "./puzzle.json";
import { addMsgCorrect, addRules, createMarkdown, replaceImages, replaceRules, replaceUrls } from "../../processing/messages";
import { generateRowCols } from "../../processing/rowcol";
import { hideGridOutside } from "../../processing/hide-grid";
import howTheTimeWarWorksUnsolved from "../how-the-time-war-works-unsolved";
import howTheTimeWarWorksSolved from "../how-the-time-war-works-solved";

const texts = Object.entries(allTexts).reduce((o, [name, text]) => {
    return {
        ...o,
        [name]: {
            default: text.default,
            raw: text.raw
        }
    }
}, {});

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

replaceRules(texts.rules);
const rules = texts.rules.default;
const msgCorrect = texts.msgcorrect.default;
const preamble = texts.preamble.default;

const sudokupad = "https://sudokupad.app/54qexpubot";
const lmd = "https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000M6F";

const markdown = createMarkdown(
    puzzle.metadata.title, 
    texts.preamble.raw, 
    texts.rules.raw,
    sudokupad,
    lmd
)

export default {
    puzzle,
    process: (data) => {
        addRules(data, rules + texts.rulesPostSudokupad.default);
        addMsgCorrect(data, msgCorrect);
        hideGridOutside(data, [0,5], [0,5]);
        generateRowCols(data, [0,5], [0,5]);

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
    rules: rules + texts.rulesPostHtml.default,
    msgCorrect,
    preamble,
    imgId: "000TBV",
    sudokupad,
    markdown,
    lmd
};