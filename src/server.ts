import http from 'http';
import express from 'express';
import { Request, Response } from 'express';
import app from './app';
import SocketSingleton from './infrastructure/sockets/SocketSingleton';
import {config} from "./config"


const PORT = config.port || 3333;
process.env.TZ = 'Africa/Algiers';

const server = http.createServer(app);

// const socketSingleton = SocketSingleton.getInstance();
// socketSingleton.initialize(server);

console.log('[ENVIRONMENT]', process.env.NODE_ENV); 
console.log('[PORT]', PORT);
console.log('[TZ]', process.env.TZ);


server.listen(PORT, () => {
  console.log('Server is running on port 3333');
});