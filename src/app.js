import puzzle from "./puzzle.json";
import { PuzzleZipper } from "./puzzlezipper";
import { loadFPuzzle } from "./fpuzzlesdecoder";

const iframe = document.getElementById("frame");

console.log(loadFPuzzle);

export function encodeSCLPuz(puzzle) {
	const { zip } = PuzzleZipper;
    return 'scl' + loadFPuzzle.compressPuzzle(zip(puzzle));
}

const puzzleId = encodeSCLPuz(JSON.stringify(puzzle));
console.log(puzzleId);
iframe.src = "https://sudokupad.app/scf?puzzleid=" + puzzleId;