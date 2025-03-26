'use client';

import { useState } from 'react';
import { GameRoom } from '../types/room';
import { RoomService } from '../services/roomService';

interface RoomInterfaceProps {
  onRoomJoined: (room: GameRoom) => void;
}

export default function RoomInterface({ onRoomJoined }: RoomInterfaceProps) {
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const roomService = new RoomService();

  const handleCreateRoom = async () => {
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      console.log('Creating room with:', { playerName, difficulty });
      const room = await roomService.createRoom(playerName, difficulty);
      console.log('Room created:', room);
      onRoomJoined(room);
    } catch (err) {
      console.error('Error creating room:', err);
      setError(err instanceof Error ? err.message : 'Failed to create room');
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!roomCode.trim()) {
      setError('Please enter a room code');
      return;
    }

    setIsJoining(true);
    setError(null);

    try {
      console.log('Joining room with:', { roomCode, playerName });
      const room = await roomService.joinRoom(roomCode.toUpperCase(), playerName);
      if (!room) {
        setError('Room not found or full');
        return;
      }
      console.log('Joined room:', room);
      onRoomJoined(room);
    } catch (err) {
      console.error('Error joining room:', err);
      setError(err instanceof Error ? err.message : 'Failed to join room');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        {isCreating ? 'Create Room' : isJoining ? 'Join Room' : 'Play Sudoku'}
      </h2>

      <div className="space-y-4">
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
            disabled={isCreating || isJoining}
          />
        </div>

        {isJoining && (
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
              disabled={isCreating || isJoining}
            />
          </div>
        )}

        {isCreating && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              disabled={isCreating || isJoining}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        )}

        {error && (
          <div className="text-red-500 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          {!isCreating && !isJoining && (
            <>
              <button
                onClick={() => setIsCreating(true)}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
                  dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-150"
              >
                Create Room
              </button>
              <button
                onClick={() => setIsJoining(true)}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 
                  dark:bg-green-600 dark:hover:bg-green-700 transition-colors duration-150"
              >
                Join Room
              </button>
            </>
          )}

          {(isCreating || isJoining) && (
            <>
              <button
                onClick={isCreating ? handleCreateRoom : handleJoinRoom}
                disabled={isCreating || isJoining}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
                  dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-150
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? 'Creating...' : isJoining ? 'Joining...' : 'Confirm'}
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setIsJoining(false);
                  setError(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 
                  dark:bg-gray-600 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 