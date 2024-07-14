import { Router } from "express";
import { RestaurentController } from "../controllers/RestaurentController";
import { RestaurentRepository } from "../../infrastructure/repositories/RestaurentRepository";
import adminRole from "../../middleware/adminRole";
import verifyToken from "../../middleware/authMiddleware";

const router = Router();

const restaurentRepo = new RestaurentRepository();

const restaurentController = new RestaurentController(restaurentRepo);


router.get('/', restaurentController.getAllRestaurents.bind(restaurentController));
router.post('/create', verifyToken , adminRole ,restaurentController.createRestaurent.bind(restaurentController));



export default router;