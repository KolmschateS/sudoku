'use client';

import { useState } from 'react';
import SudokuBoard from './components/SudokuBoard';
import { getInitialPuzzle, isBoardComplete } from './utils/sudoku';
import { Board, Position } from './types/sudoku';

export default function Home() {
  const [board, setBoard] = useState<Board>(getInitialPuzzle());
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleCellSelect = (position: Position) => {
    // Highlight related cells
    const newBoard = board.map(row => row.map(cell => ({ ...cell, isHighlighted: false })));
    
    // Highlight row and column
    for (let i = 0; i < 9; i++) {
      newBoard[position.row][i].isHighlighted = true;
      newBoard[i][position.col].isHighlighted = true;
    }
    
    // Highlight 3x3 box
    const boxRow = Math.floor(position.row / 3) * 3;
    const boxCol = Math.floor(position.col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        newBoard[boxRow + i][boxCol + j].isHighlighted = true;
      }
    }

    setBoard(newBoard);
  };

  const handleCellChange = (position: Position, value: number | null) => {
    if (!startTime) {
      setStartTime(new Date());
    }

    const newBoard = board.map(row => [...row]);
    newBoard[position.row][position.col] = {
      ...newBoard[position.row][position.col],
      value,
    };

    setBoard(newBoard);

    if (isBoardComplete(newBoard)) {
      setIsComplete(true);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Multiplayer Sudoku</h1>
        
        <div className="flex flex-col items-center gap-4">
          <SudokuBoard
            initialBoard={board}
            onCellSelect={handleCellSelect}
            onCellChange={handleCellChange}
          />
          
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
                dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-150"
              onClick={() => {
                setBoard(getInitialPuzzle());
                setStartTime(null);
                setIsComplete(false);
              }}
            >
              New Game
            </button>
          </div>

          {isComplete && (
            <div className="text-green-600 dark:text-green-400 font-bold text-xl">
              Congratulations! You&apos;ve completed the puzzle!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
