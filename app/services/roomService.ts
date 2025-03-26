import { GameRoom } from '../types/room';

export class RoomService {
  async createRoom(playerName: string, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): Promise<GameRoom> {
    const response = await fetch('/api/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playerName, difficulty }),
    });

    if (!response.ok) {
      throw new Error('Failed to create room');
    }

    return response.json();
  }

  async joinRoom(roomCode: string, playerName: string): Promise<GameRoom | null> {
    const response = await fetch('/api/rooms/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roomCode, playerName }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to join room');
    }

    return response.json();
  }

  async getRoom(roomCode: string): Promise<GameRoom | null> {
    const response = await fetch(`/api/rooms?code=${roomCode}`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to get room');
    }

    return response.json();
  }
} 