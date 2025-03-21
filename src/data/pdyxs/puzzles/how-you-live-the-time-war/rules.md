{sudoku}

{antikropki-white-pos}

Space-Time: Each row of the grid represents a slice of time, with the top row as the earliest and the bottom row as the latest. Each column of the grid represents a different location in space.

Timelines: Two Time Agents, Blue (3) and Red (7), are jumping forwards and backwards through space-time to help their side win the time war. The marked columns each represent an agent's timeline - each digit in the column shows the agent's age when they appear in that row. The rows below the grid can be used to keep track of each agent's age in each column, and are not a part of the solution.

Time Jumps: When jumping from one cell to the next (ie. when their age increases by 1), a Time Agent may travel as much as they like in time, but only up to 2 columns in space. For example, if Blue at age 2 is in column 2, their digit must appear in columns 1, 3 or 4 in the row where they are age 3.

Controlling cells: When the first Time Agent appears in a column, they take control of the cell they land in and all cells below them. Another Time Agent appearing later (ie. further down) in the column will take control, starting at the time that they arrive, if and only if they are older than the original Time Agent. For example: in a column that reads 142395876, where Blue (3) has age 3 and Red (7) has age 4, 3-9-5-8 would be Blue and 7-6 would be Red.

Winning locations: For each column, take the sum of the cells controlled by each Time Agent - the Time Agent with the highest sum wins the location. Clues below the grid denote the winning sum (or the tied sum, in a tie).

Losing the Time War: The Time Agent who wins the most locations wins the war. No-one can win the war.