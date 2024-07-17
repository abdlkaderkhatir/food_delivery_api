import { Request, Response } from "express";
import { IRestaurentRepository } from "../../domain/repositories/IRestaurentRepository";
import { CustomRequest } from "../../domain/entities/custumeRequest";
import { ICategorieRepository } from "../../domain/repositories/ICategorieRepository";
import { LocationService } from "../../infrastructure/services/LocationService";



export class RestaurentController {

    // private restaurentRepo : IRestaurentRepository;

    constructor(private restaurentRepo : IRestaurentRepository, private categoryRepo : ICategorieRepository) {
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

    async getNearRestaurents(req: Request, res: Response) {
        try {
            const { lat, long  } = req.query;
            console.log("[RestaurentController] getNearRestaurents -> lat, long", lat, long);
            
            if (!lat || !long) {
                return res.status(400).json({ message: 'Latitude and longitude are required' });
            }
            const restaurents = await this.restaurentRepo.getAllRestaurents();
            const nearstRestaurent = await  LocationService.getNearRestaurents(restaurents, parseFloat(long as string), parseFloat(lat as string));
            // const restaurents = await this.restaurentRepo.getNearRestaurents(lat as string, long as string);
            res.status(200).json(nearstRestaurent ?? []);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    async searchNearstRestaurents(req: Request, res: Response) {
        try {
            const { lat, long , search } = req.query;
            if (!search) {
                return res.status(400).json({ message: 'Search query is required' });
            }
            if (!lat || !long) {
                return res.status(400).json({ message: 'Latitude and longitude are required' });
            }
            const restaurents = await this.restaurentRepo.searchRestaurents(search as string);

            const nearstRestaurent = await  LocationService.getNearRestaurents(restaurents, parseFloat(long as string), parseFloat(lat as string));

            res.status(200).json(nearstRestaurent ?? []);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createRestaurent(req: CustomRequest, res: Response) {
        // const session = await startSession();
        // session.startTransaction();
        try {
            const userId = req.user.id;
            console.log("[RestaurentController] createRestaurent -> userId", userId);
            
            console.log(userId);
            
            const restaurent = req.body;
            const restaurentData = {
                ...restaurent,
                user_id : userId,
            }

            const restaurentExists = await this.restaurentRepo.fetchByName(restaurent.name);
            if (restaurentExists) {
                // await session.abortTransaction();
                // session.endSession();
                return res.status(400).json({ message: 'Restaurent already exists' });
            }

            const newRestaurent = await this.restaurentRepo.create(restaurentData);
            // const newRestaurent = await this.restaurentRepo.create(restaurentData, { session });

            // categories 
            if (restaurent.cousines) {
                const categories = await Promise.all(restaurent.cousines.map(async (category: string) => {
                    const categoryExists = await this.categoryRepo.fetchByName(category);
                    // const categoryExists = await this.categoryRepo.fetchByName(category, { session });
                    if (categoryExists) {
                        return categoryExists._id;
                    }
                    const newCategory = await this.categoryRepo.create({ name: category , restaurant_id : newRestaurent._id });
                    // const newCategory = await this.categoryRepo.create({ name: category , restaurant_id : newRestaurent._id }, { session });
                    return newCategory._id;
                }));
                // restaurentData.categories = categories;
            }

            // await session.commitTransaction();
            // session.endSession();
            
            res.status(201).json(newRestaurent);

        } catch (error : any) {
            // await session.abortTransaction();
            // session.endSession();
            console.log(error?.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}