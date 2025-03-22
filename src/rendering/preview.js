import { encodeSCLPuz } from "../util/encodePuzzle";

export function showPreview(puzzleObj) {
    const iframe = document.getElementById("frame");
    iframe.src = getPreviewUrl(puzzleObj);
}

export function getPreviewUrl({ processedPuzzle }) {
    return "https://sudokupad.app/scf?puzzleid=" + encodeSCLPuz(processedPuzzle);
}