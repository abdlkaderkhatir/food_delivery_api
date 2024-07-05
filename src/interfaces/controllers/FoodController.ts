import { FoodUseCases } from "../../application/use-cases/FoodUseCases";
import { Food } from "../../domain/entities/Food";
import { FoodRepository } from "../../infrastructure/repositories/FoodRepository";
import SocketSingleton from "../../infrastructure/sockets/SocketSingleton";
import { Request, Response } from "express";


export class FoodController {

    private foodUseCases: FoodUseCases;

    constructor() {
        // this.foodUseCases = foodUseCases;
        const foodRepository = new FoodRepository();
        this.foodUseCases = new FoodUseCases(foodRepository);
    }

    async getFoods(req: Request, res: Response) : Promise<void> {
        try
        {
            const foods = await this.foodUseCases.getAllFoods();
            // const io = SocketSingleton.getInstance().getIO();
      
            // if (io) {
            //     io.emit('foodsUpdated', foods);
            // }
            res.status(200).json({ foods });

        } catch (error)
        {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getFoodById(req: Request, res: Response) : Promise<void> {
        try
        {
            const { id } = req.params;
            const food = await this.foodUseCases.getFoodById(id);
            res.status(200).json(food);
        } catch (error)
        {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createFood(req: Request, res: Response) : Promise<void> {
        try
        {
            const food = req.body as Food;
            const newFood = await this.foodUseCases.createFood(food);
            res.status(201).json(newFood);
        } catch (error)
        {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateFood(req: Request, res: Response) : Promise<void> {
        try
        {
            const food = req.body as Food;
            const updatedFood = await this.foodUseCases.updateFood(food);
            res.status(200).json(updatedFood);
        } catch (error)
        {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    async deleteFood(req: Request, res: Response) : Promise<void> {
        try
        {
            const { id } = req.params;
            const deleted = await this.foodUseCases.deleteFood(id);
            res.status(200).json({ deleted });
        } catch (error)
        {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    // async getAllFoods() {
    //     return await this.foodUseCases.getAllFoods();
    // }


}
    