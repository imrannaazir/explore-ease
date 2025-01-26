import { Server as HttpServer } from 'http';
import { StatusCodes } from 'http-status-codes';
import { Server as SocketServer } from 'socket.io';
import config from './app/config';
import AppError from './app/errors/AppError';

let io: SocketServer | null = null;

export const initializeSocket = (server: HttpServer) => {
  io = new SocketServer(server, {
    cors: {
      origin: [config.client_url!],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected', socket.id);

    socket.on('join', (userId: string) => {
      socket.join(userId);
      console.log(`User ${userId} joined their privet room`);
    });

    socket.on('disconnected', () => {
      console.log(`Client disconnected:`, socket.id);
    });
  });

  return io;
};

export const getIo = (): SocketServer => {
  if (!io) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Socket.io not initialized.',
    );
  }
  return io;
};
