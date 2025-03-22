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

        const p2 = 0.115;
        // data.underlays?.forEach(({ thickness, borderColor, center: [cy, cx] }) => {
        //     data.lines.push({
        //         d: `M ${cx * 64} ${cy * 64} m 0 -22 a 22 22 0 1 1 0 44 a 22 22 0 1 1 0 -44`,
        //         color: borderColor,
        //         thickness,
        //         target: "cell-grids"
        //     })

        //     data.lines.push({
        //         wayPoints: [
        //             [cy - 0.5 + p2, cx - 0.5 + p2],
        //             [cy - 0.5 + p2, cx + 0.5 - p2],
        //             [cy + 0.5 - p2, cx + 0.5 - p2],
        //             [cy + 0.5 - p2, cx - 0.5 + p2],
        //         ],
        //         fill: "#ffffff",
        //         target: "overlay"
        //     })
        // });
        // data.underlays = [];

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

        p = 0.013;
        data.overlays.forEach(({ backgroundColor, center: [r, c] }) => {
            if (backgroundColor === "#FFFFFF") {
                if (Number.isInteger(r)) {
                    data.lines.push({
                        wayPoints: [
                            [r - p * 2, c - 0.5 + p],
                            [r - p * 2, c + 0.5 - p],
                            [r + p * 2, c + 0.5 - p],
                            [r + p * 2, c - 0.5 + p]
                        ],
                        color: "#ffffff00",
                        fill: fogColor,
                        thickness: 0,
                        target: "overlay"
                    });
                } else {
                    data.lines.push({
                        wayPoints: [
                            [r - 0.5 + p, c - p * 2],
                            [r - 0.5 + p, c + p * 2],
                            [r + 0.5 - p, c + p * 2],
                            [r + 0.5 - p, c - p * 2]
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

        data.lines.push(...foggedRenbans);
        data.lines.push(...foggedKropkiLines);
        return data;
    },
    ...texts,
    sudokupad: "https://sudokupad.app/pdyxs/sunny-with-a-chance-of-fog"
};