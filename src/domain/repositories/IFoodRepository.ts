import { Food } from "../entities/Food";

export interface IFoodRepository {

    create(food: Food): Promise<Food>;
    update(food: Food): Promise<Food>;
    delete(id: string): Promise<boolean>;
    // findAll(): Promise<Food[]>;
    findById(id: string): Promise<Food | null>;
    getAllFoodsByCategory(category: string): Promise<Food[]>;
    getAllFoods(): Promise<Food[]>;
    
}