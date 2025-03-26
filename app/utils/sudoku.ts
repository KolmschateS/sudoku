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

type Difficulty = 'easy' | 'medium' | 'hard';

interface SudokuResult {
  board: number[][];
  solution: number[][];
}

function generateEmptyBoard(): number[][] {
  return Array(9).fill(null).map(() => Array(9).fill(0));
}

function isValid(board: number[][], row: number, col: number, num: number): boolean {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) return false;
  }

  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }

  return true;
}

function solveSudoku(board: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function removeNumbers(board: number[][], difficulty: Difficulty): number[][] {
  const cellsToRemove = {
    easy: 40,
    medium: 50,
    hard: 60,
  }[difficulty];

  const puzzle = board.map(row => [...row]);
  let removed = 0;

  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }

  return puzzle;
}

export function generateSudoku(difficulty: Difficulty): SudokuResult {
  const board = generateEmptyBoard();
  
  // Fill the first row with random numbers
  const firstRow = Array.from({ length: 9 }, (_, i) => i + 1);
  for (let i = 0; i < 9; i++) {
    const randomIndex = Math.floor(Math.random() * firstRow.length);
    board[0][i] = firstRow.splice(randomIndex, 1)[0];
  }

  // Solve the rest of the puzzle
  solveSudoku(board);

  // Create a copy of the solution
  const solution = board.map(row => [...row]);

  // Remove numbers based on difficulty
  const puzzle = removeNumbers(board, difficulty);

  return {
    board: puzzle,
    solution,
  };
} 