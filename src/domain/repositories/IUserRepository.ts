import { User } from "../entities/User";

export interface IUserRepository {
    create(user: User): Promise<User>;
    update(user: User): Promise<User>;
    delete(id: string): Promise<boolean>;
    findByEmail(email: string): Promise<User | null>;
    findByEmailAndPassword(email: string, password: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    getAllUsers(): Promise<User[]>;
}