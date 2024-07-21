import { Router } from "express";
import { RestaurentController } from "../controllers/RestaurentController";
import { RestaurentRepository } from "../../infrastructure/repositories/RestaurentRepository";
import adminRole from "../../middleware/adminRole";
import verifyToken from "../../middleware/authMiddleware";
import { CategorieRepository } from "../../infrastructure/repositories/CategorieRepository";

const router = Router();

const restaurentRepo = new RestaurentRepository();
const categoryRepo = new CategorieRepository();

const restaurentController = new RestaurentController(restaurentRepo , categoryRepo);


router.get('/', restaurentController.getAllRestaurents.bind(restaurentController));
router.get('/pagination', restaurentController.getAllRestaurentsPagination.bind(restaurentController));
// near restuarents
router.get('/nearst-restaurent', restaurentController.getNearRestaurents.bind(restaurentController));
router.post('/create', verifyToken , adminRole ,restaurentController.createRestaurent.bind(restaurentController));



export default router;