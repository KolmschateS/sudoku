'use client';

import { useState } from 'react';
import { Board, Position } from '../types/sudoku';
import SudokuGrid from './SudokuGrid';

interface SudokuBoardProps {
  initialBoard: Board;
  onCellSelect?: (position: Position) => void;
  onCellChange?: (position: Position, value: number | null) => void;
}

export default function SudokuBoard({ 
  initialBoard, 
  onCellSelect, 
  onCellChange 
}: SudokuBoardProps) {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [selectedCell, setSelectedCell] = useState<Position | null>(null);

  const handleCellSelect = (position: Position) => {
    if (!board[position.row][position.col].isInitial) {
      setSelectedCell(position);
      onCellSelect?.(position);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (!selectedCell) return;

    const value = parseInt(event.key);
    
    if (value >= 1 && value <= 9) {
      const newBoard = [...board];
      newBoard[selectedCell.row][selectedCell.col] = {
        ...newBoard[selectedCell.row][selectedCell.col],
        value,
      };
      setBoard(newBoard);
      onCellChange?.(selectedCell, value);
    }
  };

  return (
    <div tabIndex={0} onKeyDown={handleKeyPress}>
      <SudokuGrid
        board={board}
        selectedCell={selectedCell}
        onCellSelect={handleCellSelect}
      />
    </div>
  );
} 