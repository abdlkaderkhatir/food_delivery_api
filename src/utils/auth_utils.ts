import { User } from "../domain/entities/User";
import { config } from "../config";
import jwt from 'jsonwebtoken';
import { log } from "console";
import RedisService from "../infrastructure/services/RedisService";


export class AuthUtils {

    static genearateOTP(degit: number = 6): string {
        const degits = "1234567890";
        let otp = "";
        for (let i = 0; i < degit; i++) {
            otp += degits[Math.floor(Math.random() * 10)];
        }
        // return parseInt(otp);    
        return otp;
    }

    static genearateRandomString(length: number = 6): string {
        const chars = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let randomString = "";
        for (let i = 0; i < length; i++) {
            randomString += chars[Math.floor(Math.random() * chars.length)];
        }
        return randomString;
    }


    static genearateAccessToken(user : Partial<User>): string {
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            }, 
            config.accessTokenSecret, 
            { expiresIn: config.accessTokenExpiresIn }
        );
        return token;
    }


    static async genearateRefreshToken(user : Partial<User>): Promise<string> {
        try {
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    role: user.role
                }, 
                config.refreshTokenSecret, 
                { expiresIn: config.refreshTokenExpiresIn }
            );
            const redisService = RedisService.getInstance();
            await redisService.setToken(user._id as string, token, 365 * 24 * 60 * 60);
            return token;
        } catch (error) {
            console.log("error",error);
            throw new Error("Token is not valid.");
        }
    }



    static verifyToken(token: string, secret: string): any {
        try {
            return jwt.verify(token, secret , { algorithms: ['HS256'] });
        } catch (error) {
            throw new Error("Token is not valid.");
        }
    }


    static verifyAccessToken(token: string): any {
        console.log("token",token);
        console.log("config.accessTokenSecret",config.accessTokenSecret );
        return AuthUtils.verifyToken(token, config.accessTokenSecret as string);
    }


    static async verifyRefreshToken(token: string): Promise<any> {
        // return AuthUtils.verifyToken(token, config.refreshTokenSecret as string);
        try {
            const decoded : any = jwt.verify(token, config.refreshTokenSecret as string, { algorithms: ['HS256'] });
            const redisService = RedisService.getInstance();
            const result = await redisService.getToken(decoded.id as string);
            if (result !== token) {
                throw new Error("Unauthorized access.");
            }
            return decoded;
        } catch (error) {
            throw new Error("Token is not valid.");
        }
    }

}