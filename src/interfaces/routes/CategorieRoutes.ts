import { Router } from "express";
import { CategorieRepository } from "../../infrastructure/repositories/CategorieRepository";
import { CategoriesController } from "../controllers/CategorieController";


const router = Router();

const categoryRepo = new CategorieRepository();

const categoryController = new CategoriesController(categoryRepo);


router.get('/', categoryController.getAllCategories.bind(categoryController));

router.post('/create', categoryController.createCategory.bind(categoryController));

router.get('/restaurent/:id', categoryController.getCategoryByRestaurent.bind(categoryController));




export default router;