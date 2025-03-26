'use client';

import { Cell } from '../types/sudoku';

interface SudokuCellProps {
  cell: Cell;
  rowIndex: number;
  colIndex: number;
  isSelected: boolean;
  onClick: () => void;
}

export default function SudokuCell({
  cell,
  rowIndex,
  colIndex,
  isSelected,
  onClick,
}: SudokuCellProps) {
  return (
    <div
      className={`
        aspect-square border flex items-center justify-center
        text-xl font-bold cursor-pointer
        border-gray-300 dark:border-gray-600
        ${cell.isInitial 
          ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100' 
          : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'
        }
        ${isSelected 
          ? 'bg-blue-200 dark:bg-blue-800' 
          : ''
        }
        ${cell.isHighlighted 
          ? 'bg-blue-100 dark:bg-blue-900/50' 
          : ''
        }
        ${(rowIndex + 1) % 3 === 0 ? 'border-b-2 border-gray-800 dark:border-gray-400' : ''}
        ${(colIndex + 1) % 3 === 0 ? 'border-r-2 border-gray-800 dark:border-gray-400' : ''}
        hover:bg-gray-50 dark:hover:bg-gray-800/50
        transition-colors duration-150
      `}
      onClick={onClick}
    >
      {cell.value}
    </div>
  );
} 