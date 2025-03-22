import { PuzzleZipper } from "~/src/sudokupad/puzzlezipper";
import { loadFPuzzle } from "~/src/sudokupad/fpuzzlesdecoder";

export function encodeSCLPuz(puzzleJSON) {
    const { zip } = PuzzleZipper;
    return 'scl' + loadFPuzzle.compressPuzzle(zip(JSON.stringify(puzzleJSON)));
}