import kropkiWhitePos from './kropki-white-pos.md';
import antiKropkiWhitePos from './antikropki-white-pos.md';
import sudoku9 from './sudoku9.md';
import sudoku6 from './sudoku6.md';

export const RulesMap = new Map([
    ['kropkiw+', kropkiWhitePos],
    ['akropkiw+', antiKropkiWhitePos],
    ['sudoku', sudoku9],
    ['sudoku6', sudoku6]
]);