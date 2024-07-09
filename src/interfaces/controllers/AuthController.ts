import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {config} from '../../config';
import { OTP } from '../../shared/utils/otp';
import { IOtpRepository } from "../../domain/repositories/IOtpRepository";
import { Otp } from "../../domain/entities/Otp";
import { EmailService } from "../../infrastructure/services/EmailService";


// dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });



export class AuthController {
    
    constructor(private userRepository: IUserRepository , private otpRepository: IOtpRepository) {}

    async register(req: Request, res: Response) {
        try {

            const { name, email, password , role , status , phone } = req.body;
            const userAlreadyExists = await this.userRepository.findByEmail(email);
            if (userAlreadyExists) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const otp = OTP.genearateOTP();

            const user = await this.userRepository.create({
                name,
                email,
                password: hashedPassword,
                phone,
                emailVerified: false,
                role,
                status
            } as User);

            console.log('[User]', user);
            console.log(user._id);
            
            const otpValue = await this.otpRepository.create({
                userId: user._id,
                otp: otp,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000),
            } as Otp);

            // send email with otp
            const emailService = new EmailService();
            await emailService.sendEmail(user.email, 'OTP Verification', `Your OTP is ${otp}`);
            

            const token = jwt.sign({ id: user.id }, config.jwtSecret as string);

            return res.status(201).json({ token, user });
        } catch (error ) {
            return res.status(400).json({ message: error });
        }
    }

    // TODO: Implement the verifyOTP method

    async verifyOTP(req: Request, res: Response) {
        try {
            const { email, otp } = req.body;
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const otpData = await this.otpRepository.findByUserId(user._id);

            if (!otpData) {
                return res.status(404).json({ message: 'OTP not found' });
            }

            if (otpData?.otp !== otp) {
                return res.status(401).json({ message: 'Invalid OTP' });
            }

            if (otpData.expiresAt && otpData.expiresAt < new Date()) {
                return res.status(401).json({ message: 'OTP has expired' });
            }

            user.emailVerified = true;
            await this.userRepository.update(user);

            return res.status(200).json({ message: 'Email verified successfully' });
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }

    // TODO: Implement the resendOTP method

    async resendOTP(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const otp = OTP.genearateOTP();
            const otpData = await this.otpRepository.findByUserId(user._id);
            if (otpData) {
                otpData.otp = otp;
                otpData.expiresAt = new Date(Date.now() + 5 * 60 * 1000);
                await this.otpRepository.update(otpData);
            } else {
                await this.otpRepository.create({
                    userId: user._id,
                    otp,
                    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
                } as Otp);
            }

            // send email with otp
            const emailService = new EmailService();
            await emailService.sendEmail(user.email, 'OTP Verification', `Your OTP is ${otp}`);

            return res.status(200).json({ message: 'OTP sent to your email' });
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }


    // TODO: Implement the verifyEmail method

    // async verifyEmail(req: Request, res: Response) {
    //     try {
    //         const { email } = req.body;
    //         const user = await this.userRepository.findByEmail(email);
    //         if (!user) {
    //             return res.status(404).json({ message: 'User not found' });
    //         }

    //         if (user.emailVerified) {
    //             return res.status(400).json({ message: 'Email already verified' });
    //         }

    //         const otp = OTP.genearateOTP();
    //         user.otp = otp;
    //         user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    //         await this.userRepository.update(user);

    //         // send email with otp
    //         // sendEmail(user.email, 'OTP Verification', `Your OTP is ${otp}`);

    //         return res.status(200).json({ message: 'OTP sent to your email' });
    //     } catch (error) {
    //         return res.status(400).json({ message: error });
    //     }
    // }
            

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await this.userRepository.findByEmailAndPassword(email, password);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = jwt.sign({ id: user.id }, config.jwtSecret as string);
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userRepository.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }


}