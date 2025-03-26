'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { generateSudoku } from './utils/sudoku';

const prisma = new PrismaClient();

export async function createRoom(playerName: string, difficulty: 'easy' | 'medium' | 'hard') {
  try {
    // Generate a random room code (6 characters)
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Generate the Sudoku puzzle
    const { board, solution } = generateSudoku(difficulty);

    // Create the room with the first player
    const room = await prisma.room.create({
      data: {
        code,
        difficulty,
        board: JSON.stringify(board),
        solution: JSON.stringify(solution),
        players: {
          create: {
            name: playerName,
          },
        },
      },
      include: {
        players: true,
      },
    });

    revalidatePath('/');
    return { success: true, room };
  } catch (error) {
    console.error('Error creating room:', error);
    return { success: false, error: 'Failed to create room' };
  }
}

export async function joinRoom(playerName: string, roomCode: string) {
  try {
    const room = await prisma.room.findUnique({
      where: { code: roomCode },
      include: { players: true },
    });

    if (!room) {
      return { success: false, error: 'Room not found' };
    }

    if (room.players.length >= room.maxPlayers) {
      return { success: false, error: 'Room is full' };
    }

    // Check if player name is already taken in this room
    const existingPlayer = room.players.find((p: { name: string }) => p.name === playerName);
    if (existingPlayer) {
      return { success: false, error: 'Player name already taken in this room' };
    }

    // Add the player to the room
    const updatedRoom = await prisma.room.update({
      where: { id: room.id },
      data: {
        players: {
          create: {
            name: playerName,
          },
        },
      },
      include: {
        players: true,
      },
    });

    revalidatePath('/');
    return { success: true, room: updatedRoom };
  } catch (error) {
    console.error('Error joining room:', error);
    return { success: false, error: 'Failed to join room' };
  }
}

export async function leaveRoom(roomId: string, playerName: string) {
  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: { players: true },
    });

    if (!room) {
      return { success: false, error: 'Room not found' };
    }

    // Remove the player from the room
    await prisma.player.deleteMany({
      where: {
        roomId,
        name: playerName,
      },
    });

    // If no players left, delete the room
    if (room.players.length <= 1) {
      await prisma.room.delete({
        where: { id: roomId },
      });
    }

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error leaving room:', error);
    return { success: false, error: 'Failed to leave room' };
  }
}

export async function getRoom(roomCode: string) {
  try {
    const room = await prisma.room.findUnique({
      where: { code: roomCode },
      include: { players: true },
    });

    if (!room) {
      return { success: false, error: 'Room not found' };
    }

    return { success: true, room };
  } catch (error) {
    console.error('Error getting room:', error);
    return { success: false, error: 'Failed to get room' };
  }
} 