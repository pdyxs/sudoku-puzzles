
export function addRows(data, extraRows) {
    if (!extraRows) return;
    const row = data.cells[0];

    for (let i = 0; i !== extraRows; ++i) {
        data.cells.push([...row]);
    }

    data.metadata.solution += "?".repeat(row.length * extraRows);
}