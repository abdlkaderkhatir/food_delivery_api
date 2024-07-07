import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {config} from '../../config';


// dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });



export class AuthController {
    
    constructor(private userRepository: IUserRepository) {}

    async register(req: Request, res: Response) {
        try {

            const { name, email, password , role , status } = req.body;
            const userAlreadyExists = await this.userRepository.findByEmail(email);
            if (userAlreadyExists) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await this.userRepository.create({
                name,
                email,
                password: hashedPassword,
                role,
                status
            } as User);

            const token = jwt.sign({ id: user.id }, config.jwtSecret as string);

            return res.status(201).json({ token, user });
        } catch (error ) {
            return res.status(400).json({ message: error });
        }
    }

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