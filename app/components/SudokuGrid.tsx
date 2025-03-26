'use client';

import { Board, Position } from '../types/sudoku';
import SudokuCell from './SudokuCell';

interface SudokuGridProps {
  board: Board;
  selectedCell: Position | null;
  onCellSelect: (position: Position) => void;
}

export default function SudokuGrid({
  board,
  selectedCell,
  onCellSelect,
}: SudokuGridProps) {
  return (
    <div className="grid grid-cols-9 gap-0 border-2 border-gray-800 dark:border-gray-400">
      {board.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <SudokuCell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            rowIndex={rowIndex}
            colIndex={colIndex}
            isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
            onClick={() => onCellSelect({ row: rowIndex, col: colIndex })}
          />
        ))
      ))}
    </div>
  );
} 