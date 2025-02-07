Sudoku: Place the digits from 1-9 in the <span style="color: green">revealed cells</span> so that no digits repeat in any row, column or 3x3 box

Kropki: A black dot between two digits means that one is double the other. A white dot between two digits means that they are consecutive.

Counting Circles: At any point, a digit N in a revealed circle means that the digit appears in <span style="color: green">revealed circles</span> N times.

Stable Digits: Cells shaded green are stable: their value remains the same throughout the puzzle. All other cells are unstable.

Dynamic fog: The grid is partially covered in fog. Fill in all revealed cells (and <span style="color: green">only the revealed cells</span>) based on the revealed clues, <span style="color: green">leaving any new stable digits until last</span>. Filling in the stable digits will reveal more of the puzzle, at which point <span style="color: green">all unstable digits will need to be recalculated</span>.