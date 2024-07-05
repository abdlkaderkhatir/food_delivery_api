import { IFoodRepository } from "../../domain/repositories/IFoodRepository";

export class GetAllFood {
    
    constructor(private foodRepository : IFoodRepository) {
        // this.foodRepository = foodRepository;
    }
    async execute() {
        return await this.foodRepository.getAllFoods();
    }
}