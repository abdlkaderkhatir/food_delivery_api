import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";



const router = Router();
const userRepo = new UserRepository();
const authController = new AuthController(userRepo);

router.post('/register', authController.register.bind(authController)); // bind is used to bind the context of the controller to the method

router.post('/login', authController.login.bind(authController));

router.get('/users', authController.getAllUsers.bind(authController));

export default router;