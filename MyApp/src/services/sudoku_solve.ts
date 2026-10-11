/**
 * Checks whether a candidate value can be placed in the given cell without
 * breaking Sudoku rules.
 *
 * A valid move must not repeat in the same row, column, or 3x3 sub-grid.
 */
function is_valid(
  board: number[][],
  row: number,
  col: number,
  numberToCheck: number
): boolean {
  // Check the whole row for duplicates.
  for (let row_index = 0; row_index < 9; row_index++) {
    if (row_index !== row) {
      const element = board[row_index][col];
      if (numberToCheck === element) {
        return false;
      }
    }
  }

  // Check the whole column for duplicates.
  for (let col_index = 0; col_index < 9; col_index++) {
    if (col_index !== col) {
      const element = board[row][col_index];
      if (numberToCheck === element) {
        return false;
      }
    }
  }

  // Check the 3x3 box that contains this position.
  const start_row = row - (row % 3);
  const start_col = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const check_row = i + start_row;
      const check_col = j + start_col;

      if (check_row !== row || check_col !== col) {
        if (board[check_row][check_col] === numberToCheck) {
          return false;
        }
      }
    }
  }

  return true;
}

/**
 * Solves a Sudoku board using backtracking.
 *
 * The function recursively fills empty cells (-1) with valid numbers from 1 to 9.
 * If no value works, it backtracks and tries the next option.
 * Returns a boolean indicating whether the board is solvable and the index of solved board.
 */
function solve_sudoku(
  board: number[][],
  solved: number[][],
  row: number,
  col: number
): [boolean, number[][]] {
  const board_size = 9;

  if (row === board_size - 1 && col === board_size) {
    return [true, solved];
  }

  if (col === board_size) {
    row++;
    col = 0;
  }

  if (board[row][col] !== -1) {
    return solve_sudoku(board, solved, row, col + 1);
  }

  for (let number = 1; number <= board_size; number++) {
    if (is_valid(board, row, col, number)) {
      board[row][col] = number;
      solved.push([row, col]);

      const [success] = solve_sudoku(board, solved, row, col + 1);

      if (success) {
        return [true, solved];
      }
      // Backtrack
      board[row][col] = -1;
      solved.pop();
    }
  }

  return [false, solved];
}

/**
 * Logs a board to the console in readable row-based format for debugging.
 */
function printBoard(board: number[][]) {
  for (const row of board) {
    console.log(row.join(' '));
  }
}

export default solve_sudoku;