import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

class SocketSingleton {
  private static instance: SocketSingleton;
  private io: SocketIOServer | null = null;

  private constructor() {}

  public static getInstance(): SocketSingleton {
    if (!SocketSingleton.instance) {
      SocketSingleton.instance = new SocketSingleton();
    }
    return SocketSingleton.instance;
  }

  public initialize(server: HttpServer): void {
    if (!this.io) {
      this.io = new SocketIOServer(server, {
        cors: {
          origin: '*',
        },
      });

      this.io.on('connection', (socket) => {
        console.log('New client connected', socket.id);

        socket.on('disconnect', () => {
          console.log('Client disconnected', socket.id);
        });
      });
    }
  }

  public getIO(): SocketIOServer | null {
    return this.io;
  }
}

export default SocketSingleton;
