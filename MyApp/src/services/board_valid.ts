/**
 * Finds all Sudoku cells that conflict with each other.
 *
 * The board is treated as a 9x9 grid, and any duplicate value found in the same
 * row, column, or 3x3 sub-grid is marked as conflicting. Empty cells (-1) are ignored.
 *
 * Returns a Set of coordinates in the format "row,column" for every cell involved
 * in a rule violation.
 */
function validateGrid(grid: number[][]): Set<string> {
  // Track the last seen position of each value in each row, column, and box.
  const rows = Array.from({ length: 9 }, () => new Map<number, number>());
  const cols = Array.from({ length: 9 }, () => new Map<number, number>());
  const boxes = Array.from({ length: 9 }, () => new Map<number, [number, number]>())

  const conflictSet = new Set<string>();

  for (let curr_row = 0; curr_row < 9; curr_row++) {
    for (let curr_col = 0; curr_col < 9; curr_col++) {
      const value = grid[curr_row][curr_col];

      // Ignore empty cells before evaluating Sudoku rules.
      if (value === -1) continue;

      // Check row duplicates.
      if (rows[curr_row].has(value)) {
        const previousCol = rows[curr_row].get(value)!;

        conflictSet.add(`${curr_row},${previousCol}`);
        conflictSet.add(`${curr_row},${curr_col}`);
      } else {
        rows[curr_row].set(value, curr_col);
      }

      // Check column duplicates.
      if (cols[curr_col].has(value)) {
        const previousRow = cols[curr_col].get(value)!;

        conflictSet.add(`${previousRow},${curr_col}`);
        conflictSet.add(`${curr_row},${curr_col}`);
      } else {
        cols[curr_col].set(value, curr_row);
      }

      // Check 3x3 box duplicates.
      const boxRow = Math.floor(curr_row / 3);
      const boxCol = Math.floor(curr_col / 3);
      const boxIndex = boxRow * 3 + boxCol;

      if (boxes[boxIndex].has(value)) {
        const [previousRow, previousCol] = boxes[boxIndex].get(value)!;

        conflictSet.add(`${previousRow},${previousCol}`);
        conflictSet.add(`${curr_row},${curr_col}`);
      } else {
        boxes[boxIndex].set(value, [curr_row, curr_col]);
      }
    }
  }

  return conflictSet;
}

export default validateGrid;
