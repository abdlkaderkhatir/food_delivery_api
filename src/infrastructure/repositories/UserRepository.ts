import { Model } from "mongoose";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IUserDocument, UserModel } from "../models/UserModel";
import { User } from "../../domain/entities/User";


export class UserRepository implements IUserRepository {
    
        private userModel: Model<IUserDocument>;
    
        constructor() {
            this.userModel = UserModel;
        }

    
        async create(user: User): Promise<User> {
            const newUser = new this.userModel(user);
            await newUser.save();
            return newUser.toObject() as User;
        }
    
        async update(user: User): Promise<User> {
            const updatedUser = await this.userModel.findByIdAndUpdate(user.id, user, { new: true });
            return updatedUser as User;
        }
    
        async delete(id: string): Promise<boolean> {
            const deletedUser = await this.userModel.findByIdAndDelete(id);
            return !!deletedUser;
        }
    
        async findByEmail(email: string): Promise<User | null> {
            const user = await this.userModel.findOne({ email });
            return user as User | null;
        }
    
        async findById(id: string): Promise<User | null> {
            const user = await this.userModel.findById(id);
            return user as User | null;
        }
    
        async getAllUsers(): Promise<User[]> {
            const users = await this.userModel.find();
            return users as User[];
        }

        async findByEmailAndPassword(email: string, password: string): Promise<User | null> {
            const user = await this.userModel.findOne({ email, password });
            return user as User | null;
        }
    }