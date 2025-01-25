import puzzle from "./puzzle/puzzle.json";
import { PuzzleZipper } from "./sudokupad/puzzlezipper";
import { loadFPuzzle } from "./sudokupad/fpuzzlesdecoder";
import { processPuzzle } from "./puzzle/process";

const processedPuzzle = processPuzzle(puzzle);

const iframe = document.getElementById("frame");

export function encodeSCLPuz(puzzle) {
	const { zip } = PuzzleZipper;
    return 'scl' + loadFPuzzle.compressPuzzle(zip(puzzle));
}

const puzzleId = encodeSCLPuz(JSON.stringify(processedPuzzle));
iframe.src = "https://sudokupad.app/scf?puzzleid=" + puzzleId;