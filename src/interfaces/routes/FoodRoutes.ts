import { Router } from "express";
import { FoodController } from "../controllers/FoodController";


const router = Router();
const foodController = new FoodController();

router.get('/foods', foodController.getFoods.bind(foodController));

export default router;