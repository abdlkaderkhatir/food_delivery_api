import { Request, Response } from "express";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { CustomRequest } from "../../domain/entities/custumeRequest";



export class UserController {

    constructor(private userRepository : IUserRepository ){}

    // async getProfile(req: Request & { user: any }, res: Response ) : Promise<Response> {
    async getProfile(req: CustomRequest , res: Response ) : Promise<Response> {
        const userId = req.user.id;
        const user = await this.userRepository.findById(userId);
        // const user = await this.userRepository.findById(req.params.id)
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    }


    // TODO : Implement get all users
    async getAllUsers(req: Request, res: Response) {
        const users = await this.userRepository.getAllUsers();
        return res.status(200).json(users);
    }


}