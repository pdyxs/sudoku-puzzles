import * as allTexts from "./*.md";
import puzzle from "./puzzle.json";
import { addMsgCorrect, addRules, replaceRules, setupTexts } from "~/src/processing/messages";
import { createAdjacentRevealableFogTriggers } from "~/src/processing/selective-adjacent-fog";

const texts = setupTexts(allTexts);

replaceRules(texts.rules);

const unshadedArray = [
    [1, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 1, 1, 1]
]

export default {
    puzzle,
    process: (data) => {
        addRules(data, texts.rules.default);
        addMsgCorrect(data, texts.msgcorrect.default);

        //Note - the json's cages and circles are the wrong way around and need to be swapped

        const overCircles = data.underlays;
        const underCircles = data.overlays.filter(({ width }) => width > 0.5);

        //only keep the kropkis, we'll re-add the others later
        data.overlays = data.overlays.filter(({ width }) => width < 0.5);
        data.underlays = [];

        //Generate fog
        createAdjacentRevealableFogTriggers(data, unshadedArray);

        //add circles above fog
        data.lines = data.cages.map(({ cells: [[r, c]] }) => ({
            "d": `M ${c * 64} ${r * 64} m 32 8 a 24 24 0 1 1 0 48 a 24 24 0 1 1 0 -48`,
            "color": "#FFFFFF",
            "thickness": 2,
            "target": "cell-grids"
        }));
        data.cages = undefined;

        //add cages above fog
        const p = 0.075;
        // data.lines = data.cages.map(({ cells: [[r, c]] }) => ({
        data.lines.push(...overCircles.map(({ center: [r, c] }) => ({
            wayPoints: [
                [r - 0.5 + p, c - 0.5 + p],
                [r - 0.5 + p, c + 0.5 - p],
                [r + 0.5 - p, c + 0.5 - p],
                [r + 0.5 - p, c - 0.5 + p],
                [r - 0.5 + p, c - 0.5 + p],
            ],
            color: "#ffffff",
            thickness: 1,
            target: "cell-grids",
            "stroke-dasharray": "5 4",
            "stroke-dashcorner": "4",
        })));

        //Add all cages below fog
        data.lines.push(...[...overCircles, ...underCircles].map(({ center: [r, c] }) => ({
            wayPoints: [
                [r - 0.5 + p, c - 0.5 + p],
                [r - 0.5 + p, c + 0.5 - p],
                [r + 0.5 - p, c + 0.5 - p],
                [r + 0.5 - p, c - 0.5 + p],
                [r - 0.5 + p, c - 0.5 + p],
            ],
            color: "#000000",
            thickness: "1.5px",
            target: "overlay",
            "stroke-dasharray": "5 3",
            "stroke-dashcorner": "4",
        })));

        // //add circles above fog
        // data.lines.push(...overCircles.map(({ center: [r, c] }) => ({
        //     "d": `M ${c * 64} ${r * 64} m 0 -24 a 24 24 0 1 1 0 48 a 24 24 0 1 1 0 -48`,
        //     "color": "#FFFFFF",
        //     "thickness": 2,
        //     "target": "cell-grids"
        // })));

        // //Add all circles below fog
        // data.underlays.push(...overCircles, ...underCircles);

        // //add triggereffects for the kropki
        // data.triggereffect.push(...['r3c4', 'r3c5', 'r4c5', 'r5c5'].map(cell => ({
        //     trigger: {
        //         type: 'cellvalue',
        //         cell
        //     },
        //     effect: {
        //         type: 'foglight',
        //         cells: 'r4c6'
        //     }
        // })));

        // data.underlays.push({
        //     center: [3.5, 5.5],
        //     width: 1,
        //     height: 1,
        //     backgroundColor: "#AFAFAFFF"
        // });

        // const pd = 0.01;
        // data.lines.push({
        //     wayPoints: [
        //         [3, 5 + pd],
        //         [3, 6],
        //         [4 - pd, 6],
        //         [4 - pd, 5 + pd],
        //         [3.8, 5 + pd],
        //         [3.5, 5.5],
        //         [3.2, 5 + pd],
        //         [3, 5 + pd]
        //     ],
        //     fill: "#AFAFAF",
        //     target: "cell-highlights"
        // });

        return data;
    },
    ...texts,
    imgId: "000U8C",
    sudokupad: "https://sudokupad.app/pdyxs/friends-in-the-fog",
    lmd: "https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000MVQ",
};