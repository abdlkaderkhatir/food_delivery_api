import { Request, Response } from "express";
import { IRestaurentRepository } from "../../domain/repositories/IRestaurentRepository";
import { CustomRequest } from "../../domain/entities/custumeRequest";



export class RestaurentController {

    // private restaurentRepo : IRestaurentRepository;

    constructor(private restaurentRepo : IRestaurentRepository){
        // this.restaurentRepo = restaurentRepo;
    }


    async getAllRestaurents(req: Request, res: Response) {
        try {   
            const restaurents = await this.restaurentRepo.getAllRestaurents();
            res.status(200).json(restaurents ?? []);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createRestaurent(req: CustomRequest, res: Response) {
        try {
            const userId = req.user.id;
            console.log("[RestaurentController] createRestaurent -> userId", userId);
            
            console.log(userId);
            
            const restaurent = req.body;
            const restaurentData = {
                ...restaurent,
                user_id : userId,
            }
            // const restaurentExists = await this.restaurentRepo.fetchOne(restaurent.name);
            // if (restaurentExists) {
            //     return res.status(400).json({ message: 'Restaurent already exists' });
            // }
            const newRestaurent = await this.restaurentRepo.create(restaurentData);
            res.status(201).json(newRestaurent);
        } catch (error : any) {
            console.log(error?.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}