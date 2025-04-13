{sudoku}

Nurikabe: Divide the grid into a number of islands — orthogonally-connected groups of cells. Every island contains a single circled cell; the digit in the circle indicates the number of cells making up the island.
The islands are surrounded by a waterway — a single orthogonally-connected group of cells. Digits on islands can repeat if otherwise allowed.
All caged cells are waterway cells; the digit in a caged cell indicates how many waterway cells are seen orthogonally from that position, including itself (island cells block vision). The waterway cannot form any 2x2 areas.

Nurikabe fog: The grid is covered in fog. A correct digit entered into a waterway cell will clear fog from that cell, and from any waterway cells which are adjacent (either orthogonally or diagonally). The fog on island cells will never be cleared.

Friendly Islands: A cell is “friendly” if it has a value identical to its row-, column- or box-number (e.g. r2c3 can be a 1, 2 or 3). All friendly cells in the grid must be on islands, and all circled cells are friendly.

{kropki-white-pos}