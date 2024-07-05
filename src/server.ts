import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import app from './app';
import SocketSingleton from './infrastructure/sockets/SocketSingleton';

dotenv.config();

const PORT = process.env.PORT || 3333;

const server = http.createServer(app);

// const socketSingleton = SocketSingleton.getInstance();
// socketSingleton.initialize(server);


server.listen(PORT, () => {
  console.log('Server is running on port 3333');
});