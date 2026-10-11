/**
 * Removes a specified percentage of numbers from a solved Sudoku grid to create a partially solved puzzle.
 * @param grid - The solved Sudoku grid.
 * @param solvedIndexes - The indexes of the solved cells in the grid.
 * @param amount - The percentage of numbers to remove (0-100).
 * @returns A new Sudoku grid with some numbers removed.
 */
function toNotAdd(
    grid: number[][],
    solvedIndexes: number[][],
    amount: number
): number[][] {
    if (amount <= 0 || amount >= 100) {
        return grid;
    }

    const result = grid.map(row => [...row]);

    for (const [i, j] of solvedIndexes) {
        if (Math.random() >= amount / 100) {
            result[i][j] = -1;
        }
    }

    return result;
}

export default toNotAdd;
