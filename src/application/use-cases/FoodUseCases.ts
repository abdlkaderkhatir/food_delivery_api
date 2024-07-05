import { Food } from "../../domain/entities/Food";
import { IFoodRepository } from "../../domain/repositories/IFoodRepository";


export class FoodUseCases {
    constructor(private foodRepository: IFoodRepository) {
        // this.foodRepository = foodRepository;
    }
    async getAllFoods() {
        return await this.foodRepository.getAllFoods();
    }
    async getFoodById(id: string) {
        return await this.foodRepository.findById(id);
    }
    async getFoodByCategory(category: string) {
        return await this.foodRepository.getAllFoodsByCategory(category);
    }
    async createFood(food: Food) {
        return await this.foodRepository.create(food);
    }
    async updateFood(food: Food) {
        return await this.foodRepository.update(food);
    }
    async deleteFood(id: string) {
        return await this.foodRepository.delete(id);
    }
}