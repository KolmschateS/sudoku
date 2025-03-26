export type CellValue = number | null;
export type Cell = {
  value: CellValue;
  isInitial: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  notes: number[];
};

export type Board = Cell[][];
export type Position = {
  row: number;
  col: number;
};

export type GameState = {
  board: Board;
  selectedCell: Position | null;
  isComplete: boolean;
  startTime: Date | null;
  endTime: Date | null;
};

export type Player = {
  id: string;
  name: string;
  board: Board;
  isComplete: boolean;
  startTime: Date | null;
  endTime: Date | null;
}; 