'use client';

import { useState } from 'react';

interface WelcomeScreenProps {
  onCreateRoom: (playerName: string, difficulty: 'easy' | 'medium' | 'hard') => void;
  onJoinRoom: (playerName: string, roomCode: string) => void;
}

export default function WelcomeScreen({ onCreateRoom, onJoinRoom }: WelcomeScreenProps) {
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [mode, setMode] = useState<'welcome' | 'create' | 'join'>('welcome');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    if (mode === 'create') {
      onCreateRoom(playerName, difficulty);
    } else if (mode === 'join') {
      onJoinRoom(playerName, roomCode.toUpperCase());
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        {mode === 'welcome' ? 'Welcome to Sudoku' : 
         mode === 'create' ? 'Create New Room' : 'Join Existing Room'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Name
          </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Enter your name"
            required
          />
        </div>

        {mode === 'join' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Room Code
            </label>
            <input
              type="text"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Enter room code"
              required
            />
          </div>
        )}

        {mode === 'create' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        )}

        <div className="flex gap-4">
          {mode === 'welcome' ? (
            <>
              <button
                type="button"
                onClick={() => setMode('create')}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
                  dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-150"
              >
                Create Room
              </button>
              <button
                type="button"
                onClick={() => setMode('join')}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 
                  dark:bg-green-600 dark:hover:bg-green-700 transition-colors duration-150"
              >
                Join Room
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
                  dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-150"
              >
                {mode === 'create' ? 'Create Room' : 'Join Room'}
              </button>
              <button
                type="button"
                onClick={() => setMode('welcome')}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 
                  dark:bg-gray-600 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                Back
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
} 