import dotenv from 'dotenv';
import { mongo } from 'mongoose';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });


export const config = {
    jwtSecret: process.env.JWT_SECRET as string,
    port: process.env.PORT || 3333,
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'database',
        mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/food-delivery',
    },
    socket: {
        port: process.env.SOCKET_PORT || 3334
    }
};
