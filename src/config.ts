import dotenv from 'dotenv';
import { access } from 'fs';
import { mongo } from 'mongoose';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });


export const config = {
    jwtSecret: process.env.JWT_SECRET as string,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
    port: process.env.PORT , //|| 3333,
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'database',
        mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/food-delivery',
    },
    email: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || '',
    },
    socket: {
        port: process.env.SOCKET_PORT || 3334
    },
    redis: {
        url: process.env.REDIS_URL,
        url_redis: process.env.REDIS_URL_REMOT,
        port_redis: process.env.REDIS_PORT_REMOT,
        password_redis: process.env.REDIS_PASSWORD_REMOT,
        user_redis: process.env.REDIS_USER_REMOT
    }
};
