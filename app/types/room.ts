export interface Player {
  id: string;
  name: string;
  joinedAt: Date;
  lastActive: Date;
}

export interface GameRoom {
  id: string;
  code: string;
  createdAt: Date;
  startedAt: Date | null;
  endedAt: Date | null;
  players: Player[];
  maxPlayers: number;
  status: 'waiting' | 'playing' | 'finished';
  board: string; // JSON stringified board
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface RoomState {
  rooms: GameRoom[];
  activePlayers: number;
  totalGames: number;
} 