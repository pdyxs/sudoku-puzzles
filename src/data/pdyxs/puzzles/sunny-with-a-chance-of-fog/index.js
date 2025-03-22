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

        const fogColor = "#A3A3A3";

        //Setup renban lines (hollow and non-hollow) for later
        const foggedRenbans = [];
        const foggedKropkiLines = [];
        data.lines.forEach((line) => {
            if (line.color === "#FFFFFF") {
                foggedKropkiLines.push({
                    ...line,
                    color: fogColor,
                    target: "overlay",
                });
            } else {
                line.target = "cell-grids";

                foggedRenbans.push({
                    ...line,
                    color: "#888",
                    target: "overlay",
                });
            }
        });

        //Step 1: make the fog, look like not fog
        let p = 0.01;
        for (let r = 0; r !== 9; ++r) {
            for (let c = 0; c !== 9; ++c) {
                data.lines.push({
                    wayPoints: [
                        [r + p, c + p],
                        [r + 1 - p, c + p],
                        [r + 1 - p, c + 1 - p],
                        [r + p, c + 1 - p]
                    ],
                    color: "#ffffff00",
                    fill: "#ffffff",
                    thickness: 0,
                    target: "cell-highlights"
                });
            }
        }

        //Step 2: Create fog, using a transparent layer
        for (let r = 0; r !== 9; ++r) {
            for (let c = 0; c !== 9; ++c) {
                data.lines.push({
                    wayPoints: [
                        [r + p, c + p],
                        [r + 1 - p, c + p],
                        [r + 1 - p, c + 1 - p],
                        [r + p, c + 1 - p]
                    ],
                    color: "#ffffff00",
                    fill: "#00000066",
                    thickness: 0,
                    target: "overlay"
                });
            }
        }

        //Step 3: Add overlays to remove grid lines wherever kropki dots are
        p = 0.006;
        const lp = 0.024;
        const w = 0.01;
        data.overlays.forEach(({ backgroundColor, center: [r, c] }) => {
            if (backgroundColor === "#FFFFFF") {
                if (Number.isInteger(r)) {
                    let cneg = Math.floor(c);
                    let cpos = Math.ceil(c);
                    cneg = cneg + (cneg % 3 === 0 ? lp : p);
                    cpos = cpos - (cpos % 3 === 0 ? lp : p);
                    data.lines.push({
                        wayPoints: [
                            [r - w, cneg],
                            [r - w, cpos],
                            [r + w, cpos],
                            [r + w, cneg]
                        ],
                        color: "#ffffff00",
                        fill: fogColor,
                        thickness: 0,
                        target: "overlay"
                    });
                } else {
                    let rneg = Math.floor(r);
                    let rpos = Math.ceil(r);
                    rneg = rneg + (rneg % 3 === 0 ? lp : p);
                    rpos = rpos - (rpos % 3 === 0 ? lp : p);
                    data.lines.push({
                        wayPoints: [
                            [rpos, c - w],
                            [rpos, c + w],
                            [rneg, c + w],
                            [rneg, c - w]
                        ],
                        color: "#ffffff00",
                        fill: fogColor,
                        thickness: 0,
                        target: "overlay"
                    });
                }
            }
        });
        data.overlays = [];

        //Step 4: Render renbans over the fog
        data.lines.push(...foggedRenbans);

        //Step 5: Render black kropkis over the renbans
        data.lines.push(...foggedKropkiLines);
        return data;
    },
    ...texts,
    imgId: "000TTI",
    sudokupad: "https://sudokupad.app/pdyxs/sunny-with-a-chance-of-fog",
    lmd: "https://logic-masters.de/Raetselportal/Raetsel/zeigen.php?id=000MJC"
};