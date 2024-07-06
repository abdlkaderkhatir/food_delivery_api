import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();


export class AuthUseCases {

    constructor(private userRepository: IUserRepository) {
        // this.userRepository = userRepository;
    }

    async register(user: User) {
        const userExists = await this.userRepository.findByEmail(user.email);
        if (userExists) {
            throw new Error('User already exists');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        return await this.userRepository.create(user);
        // return await this.userRepository.create(user);
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findByEmailAndPassword(email, password);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        return user;
    }

    async getAllUsers() {
        return await this.userRepository.getAllUsers();
    }

    async getUserById(id: string) {
        return await this.userRepository.findById(id);
    }

    async updateUser(user: User) {
        return await this.userRepository.update(user);
    }

    async deleteUser(id: string) {
        return await this.userRepository.delete(id);
    }
}