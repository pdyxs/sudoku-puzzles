
export function getSolutionArray(data) {
    // Remove any non-digit characters if needed
    const cleanedString = data.metadata.solution.replace(/\D/g, '');
    
    // Ensure the string has exactly 81 characters (9x9 grid)
    if (cleanedString.length !== 81) {
        throw new Error('Input string must be exactly 81 digits long');
    }
    
    // Create the 9x9 grid
    const grid = [];
    
    for (let i = 0; i < 9; i++) {
        // Extract a slice of 9 digits for each row
        const row = cleanedString
            .slice(i * 9, (i + 1) * 9)
            .split('')
            .map(Number);
        
        grid.push(row);
    }
    
    return grid;
}

export function cellsStr(cells, separator = "") {
   return cells.map(({r,c}) => cellStr(r,c)).join(separator);
}

export function cellStr(r, c) {
    return `r${r+1}c${c+1}`;
}