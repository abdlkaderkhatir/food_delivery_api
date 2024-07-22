import { User } from "../domain/entities/User";
import { config } from "../config";
import jwt from 'jsonwebtoken';


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


    static genearateRefreshToken(user : Partial<User>): string {
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            }, 
            config.refreshTokenSecret, 
            { expiresIn: config.refreshTokenExpiresIn }
        );
        return token;
    }



    static verifyToken(token: string, secret: string): any {
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            return null;
        }
    }


    static verifyAccessToken(token: string): any {
        return this.verifyToken(token, config.accessTokenSecret);
    }


    static verifyRefreshToken(token: string): any {
        return this.verifyToken(token, config.refreshTokenSecret);
    }

}