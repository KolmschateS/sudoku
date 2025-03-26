'use client';

import { GameRoom } from '../types/room';

interface GameHeaderProps {
  room: GameRoom;
  onLeaveRoom: () => void;
}

export default function GameHeader({ room, onLeaveRoom }: GameHeaderProps) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center sm:items-start">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Room Code: <span className="font-mono font-bold">{room.code}</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Difficulty: <span className="capitalize">{room.difficulty}</span>
          </div>
        </div>

        <div className="flex flex-col items-center sm:items-end">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Players ({room.players.length}/{room.maxPlayers}):
          </div>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            {room.players.map((player) => (
              <div
                key={player.id}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 
                  rounded-full text-sm"
              >
                {player.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onLeaveRoom}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 
            dark:bg-red-600 dark:hover:bg-red-700 transition-colors duration-150"
        >
          Leave Room
        </button>
      </div>
    </div>
  );
} 