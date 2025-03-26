import { Board, Cell, CellValue } from '../types/sudoku';

export function createEmptyBoard(): Board {
  return Array(9).fill(null).map(() =>
    Array(9).fill(null).map(() => ({
      value: null,
      isInitial: false,
      isSelected: false,
      isHighlighted: false,
      notes: [],
    }))
  );
}

export function isValidMove(board: Board, row: number, col: number, value: CellValue): boolean {
  if (value === null) return true;

  // Check row
  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i].value === value) return false;
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (i !== row && board[i][col].value === value) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const currentRow = boxRow + i;
      const currentCol = boxCol + j;
      if (currentRow !== row && currentCol !== col && board[currentRow][currentCol].value === value) {
        return false;
      }
    }
  }

  return true;
}

export function isBoardComplete(board: Board): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value === null) return false;
      if (!isValidMove(board, row, col, board[row][col].value)) return false;
    }
  }
  return true;
}

// Example puzzle (you can replace this with your own puzzle generator)
export function getInitialPuzzle(): Board {
  const puzzle = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
  ];

  return puzzle.map(row =>
    row.map(value => ({
      value: value === 0 ? null : value,
      isInitial: value !== 0,
      isSelected: false,
      isHighlighted: false,
      notes: [],
    }))
  );
} 