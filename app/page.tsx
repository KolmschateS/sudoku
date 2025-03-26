'use client';

import { useState } from 'react';
import SudokuBoard from './components/SudokuBoard';
import WelcomeScreen from './components/WelcomeScreen';
import GameHeader from './components/GameHeader';
import { GameRoom } from './types/room';
import { createRoom, joinRoom, leaveRoom } from './actions';

export default function Home() {
  const [currentRoom, setCurrentRoom] = useState<GameRoom | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [gameBoard, setGameBoard] = useState<number[][]>([]);

  const handleCreateRoom = async (playerName: string, difficulty: 'easy' | 'medium' | 'hard') => {
    try {
      const result = await createRoom(playerName, difficulty);
      if (result.success && result.room) {
        setCurrentRoom(result.room);
        setGameBoard(JSON.parse(result.room.board));
      } else {
        setError(result.error || 'Failed to create room');
      }
    } catch {
      setError('Failed to create room. Please try again.');
    }
  };

  const handleJoinRoom = async (playerName: string, roomCode: string) => {
    try {
      const result = await joinRoom(playerName, roomCode);
      if (result.success && result.room) {
        setCurrentRoom(result.room);
        setGameBoard(JSON.parse(result.room.board));
      } else {
        setError(result.error || 'Failed to join room');
      }
    } catch {
      setError('Failed to join room. Please try again.');
    }
  };

  const handleLeaveRoom = async () => {
    if (!currentRoom) return;

    try {
      const result = await leaveRoom(currentRoom.id, currentRoom.players[0].name);
      if (result.success) {
        setCurrentRoom(null);
        setGameBoard([]);
        setSelectedCell(null);
      } else {
        setError(result.error || 'Failed to leave room');
      }
    } catch {
      setError('Failed to leave room. Please try again.');
    }
  };

  const handleCellSelect = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  const handleCellChange = (value: number) => {
    if (!selectedCell || !currentRoom) return;

    const newBoard = [...gameBoard];
    newBoard[selectedCell.row][selectedCell.col] = value;
    setGameBoard(newBoard);
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
                board={gameBoard}
                selectedCell={selectedCell}
                onCellSelect={handleCellSelect}
                onCellChange={handleCellChange}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
