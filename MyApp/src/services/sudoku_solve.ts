function is_valid(board: number[][], row: number, col: number, numberToCheck: number): boolean {
    for (let row_index = 0; row_index < 9; row_index++) {
        if (row_index != row) {
            const element = board[row_index][col];
            if (numberToCheck == element) {return false;}
        }
    }

    for (let col_index = 0; col_index < 9; col_index++) {
        if (col_index != col) {
            const element = board[row][col_index];
            if (numberToCheck == element) {return false;}
        }
    }

    const start_row = row - (row % 3); const start_col = col - (col % 3);
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const check_row = i + start_row; const check_col = j + start_col;
            if (check_col != col || check_row != row) {    
                if (board[check_row][check_col] == numberToCheck) {
                    return false;
                }}
        }
        
    }
    return true;
}


function solve_sudoku(board: number[][], row: number, col: number): boolean {
    const board_size = 9;

    if (row == board_size - 1 && col == board_size) {return true;}

    if (col == board_size) {
        row++;
        col = 0;
    }

    if (board[row][col] != -1) {
        return solve_sudoku(board, row, col + 1);
    }

    for (let number = 1; number <= board_size; number++) {
        if (is_valid(board, row, col, number)) {
            board[row][col] = number;
            if (solve_sudoku(board, row, col + 1)) {return true;}
            board[row][col] = -1;
        }        
    }
    return false;
}


function printBoard(board: number[][]) {
  for (const row of board) {
    console.log(row.join(' '));
  }
}


export default solve_sudoku;