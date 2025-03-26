'use client';

import { useState } from 'react';
import SudokuBoard from './components/SudokuBoard';
import WelcomeScreen from './components/WelcomeScreen';
import GameHeader from './components/GameHeader';
import { getInitialPuzzle, isBoardComplete } from './utils/sudoku';
import { Board, Position } from './types/sudoku';
import { GameRoom } from './types/room';

export default function Home() {
  const [board, setBoard] = useState<Board>(getInitialPuzzle());
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<GameRoom | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleCreateRoom = async (playerName: string, difficulty: 'easy' | 'medium' | 'hard') => {
    try {
      // TODO: Implement room creation
      console.log('Creating room:', { playerName, difficulty });
      setError(null);
    } catch (err) {
      setError('Failed to create room. Please try again.');
    }
  };

  const handleJoinRoom = async (playerName: string, roomCode: string) => {
    try {
      // TODO: Implement room joining
      console.log('Joining room:', { playerName, roomCode });
      setError(null);
    } catch (err) {
      setError('Failed to join room. Please try again.');
    }
  };

  const handleLeaveRoom = () => {
    setCurrentRoom(null);
    setBoard(getInitialPuzzle());
    setStartTime(null);
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900">
      <main className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Multiplayer Sudoku</h1>
        
        {error && (
          <div className="w-full p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-lg">
            {error}
          </div>
        )}

        {!currentRoom ? (
          <WelcomeScreen
            onCreateRoom={handleCreateRoom}
            onJoinRoom={handleJoinRoom}
          />
        ) : (
          <div className="w-full space-y-4">
            <GameHeader
              room={currentRoom}
              onLeaveRoom={handleLeaveRoom}
            />
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <SudokuBoard
                initialBoard={board}
                onCellSelect={handleCellSelect}
                onCellChange={handleCellChange}
              />
            </div>

            {isComplete && (
              <div className="text-center p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-lg">
                Congratulations! You&apos;ve completed the puzzle!
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
