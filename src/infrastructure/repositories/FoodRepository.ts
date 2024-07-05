import { Model } from "mongoose";
import { Food } from "../../domain/entities/Food";
import { IFoodRepository } from "../../domain/repositories/IFoodRepository";
import { FoodModel, IFoodDocument } from '../models/FoodModel';


export class FoodRepository implements IFoodRepository {

    private foodModel: Model<IFoodDocument>;

    constructor() {
        this.foodModel = FoodModel;
    }

    async create(food: Food): Promise<Food> {
        const newFood = new this.foodModel(food);
        await newFood.save();
        return newFood.toObject() as Food;
    }

    async update(food: Food): Promise<Food> {
        const updatedFood = await this.foodModel.findByIdAndUpdate(food.id, food, { new: true });
        return updatedFood as Food;
    }

    async delete(id: string): Promise<boolean> {
        const deletedFood = await this.foodModel.findByIdAndDelete(id);
        return !!deletedFood;
    }

    async findById(id: string): Promise<Food | null> {
        const food = await this.foodModel.findById(id);
        return food as Food | null;
    }

    async getAllFoodsByCategory(category: string): Promise<Food[]> {
        const foods = await this.foodModel.find({ category });
        return foods as Food[];
    }

    async getAllFoods(): Promise<Food[]> {
        const foods = await this.foodModel.find();
        return foods as Food[];
    }
}