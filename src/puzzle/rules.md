Sudoku: Fill the grid with the digits 1-9, so that each digit occurs exactly once in every row, every column and every 3x3 box.

Contours: Red lines are contours. Each line has a "high" side and a "low" side, to be determined by the solver. If two orthogonal digits are separated by a contour line, the digit on the "high" side must be higher.

Skyscraper Fog: The grid begins covered in fog. Each digit represents terrain of a height of that digit itself. Higher digits always block the line of sight of smaller digits.

When a digit is placed, fog will clear at that cell, and from any cells that can be seen from that cell in one of the four orthogonal directions. Note that the height of a cell is irrelevant for determining what can be seen from it.

Given digit: A white digit is given, but will need to be entered.

Solving note: You'll need to delete digits you have solved in order to determine what other digits see. Use other markings (letters/colours with a white flash) to keep track of this.