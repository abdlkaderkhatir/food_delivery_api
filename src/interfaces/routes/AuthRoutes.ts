import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { OtpRepository } from "../../infrastructure/repositories/OtpRepository";



const router = Router();
const userRepo = new UserRepository();
const otpRepo = new OtpRepository();
const authController = new AuthController(userRepo, otpRepo);

router.post('/register', authController.register.bind(authController)); 

// verify email
// router.post('/verify-email', authController.verifyEmail.bind(authController));

// verify otp
router.post('/verify-otp', authController.verifyOTP.bind(authController));

// resend otp
router.post('/resend-otp', authController.resendOTP.bind(authController));

router.post('/login', authController.login.bind(authController));

router.get('/users', authController.getAllUsers.bind(authController));

export default router;