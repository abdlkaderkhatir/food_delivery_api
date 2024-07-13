import { Router } from "express";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { UserController } from "../controllers/UserController";
import verifyToken from "../../middleware/authMiddleware";
import { CustomRequest } from "../../domain/entities/custumeRequest";



const router = Router();
const userRepo = new UserRepository();

const userController = new UserController(userRepo);


router.get('/profile', verifyToken , userController.getProfile.bind(userController));


// module.exports = router;
export default router;
