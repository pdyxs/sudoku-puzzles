import { getPreviewUrl } from "./preview";
import { snippets } from "~/src/data";

function getHtml(text) {
    if (text?.default === "") return "";
    return text?.default || text || "";
}

export function renderOverview({
    name: seriesName,
    hidePuzzleList,
    puzzles: seriesPuzzles
}, puzzleObj) {
    const {
        processedPuzzle,
        puzzle,
        rules,
        msgCorrect,
        msgcorrect,
        preamble,
        sudokupad,
        rulesPostHtml,
        solveguide,
        msgPost,
        imgId,
    } = puzzleObj;

    //Preview link
    document.getElementById("previewLink").setAttribute("href", getPreviewUrl(puzzleObj));

    //Overview
    document.getElementById("puzzle-title").innerHTML = processedPuzzle.metadata.title;
    document.getElementById("puzzle-rules").innerHTML = getHtml(rules) + getHtml(rulesPostHtml);
    if (preamble !== undefined) {
        document.getElementById("puzzle-preamble").innerHTML = getHtml(preamble);
    } else {
        document.getElementById("puzzle-preamble").innerHTML = "";
    }

    document.getElementById("puzzle-msgcorrect").innerHTML = getHtml(msgCorrect) + getHtml(msgcorrect);

    if (sudokupad !== undefined) {
        document.getElementById("sudokupad-link").innerText = "Play in Sudokupad"
        document.getElementById("sudokupad-link").setAttribute("href", sudokupad);
    } else {
        document.getElementById("sudokupad-link").innerText = "No Sudokupad Link set"
    }

    const otherSeriesPuzzles = seriesPuzzles.filter(p => p.lmd !== undefined && p.puzzle?.metadata?.title !== puzzle?.metadata?.title);
    let postHtml = getHtml(msgPost);
    if (!hidePuzzleList && otherSeriesPuzzles.length > 0) {
        postHtml += `<h4 style="margin-bottom: 0">More ${seriesName} puzzles:</h4>\n<ul style="margin-top: 0.4em">\n`;
        postHtml += otherSeriesPuzzles.map(({ puzzle, lmd }) => `\t<li><a href="${lmd}">${puzzle.metadata.title}</a></li>`).join("\n");
        postHtml += "\n</ul>";
    }
    postHtml += (snippets.contact?.default || "");
    document.getElementById("post").innerHTML = postHtml;

    if (solveguide !== undefined) {
        document.getElementById("solve-guide").innerHTML =
            `<h3>Solve Guide</h3>${getHtml(solveguide)}`;
    } else {
        document.getElementById("solve-guide").innerHTML = "";
    }

    if (imgId !== undefined) {
        document.getElementById("image-placeholder").innerHTML = `Image id: ${imgId}`;
    } else {
        document.getElementById("image-placeholder").innerHTML = `No image specified`;
    }
}