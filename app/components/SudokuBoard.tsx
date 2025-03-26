interface SudokuBoardProps {
  board: number[][];
  selectedCell: { row: number; col: number } | null;
  onCellSelect: (row: number, col: number) => void;
  onCellChange: (value: number) => void;
}

export default function SudokuBoard({
  board,
  selectedCell,
  onCellSelect,
  onCellChange,
}: SudokuBoardProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!selectedCell) return;

    const key = event.key;
    if (key >= '1' && key <= '9') {
      onCellChange(parseInt(key));
    } else if (key === 'Backspace' || key === 'Delete') {
      onCellChange(0);
    }
  };

  return (
    <div 
      className="grid grid-cols-9 gap-1"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            className={`
              aspect-square text-center text-xl font-medium
              ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                ? 'bg-blue-100 dark:bg-blue-900'
                : 'bg-white dark:bg-gray-700'
              }
              ${colIndex % 3 === 0 ? 'border-l-2 border-gray-300 dark:border-gray-600' : ''}
              ${rowIndex % 3 === 0 ? 'border-t-2 border-gray-300 dark:border-gray-600' : ''}
              ${colIndex === 8 ? 'border-r-2 border-gray-300 dark:border-gray-600' : ''}
              ${rowIndex === 8 ? 'border-b-2 border-gray-300 dark:border-gray-600' : ''}
            `}
            onClick={() => onCellSelect(rowIndex, colIndex)}
          >
            {value || ''}
          </button>
        ))
      )}
    </div>
  );
} 