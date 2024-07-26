import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { OtpRepository } from "../../infrastructure/repositories/OtpRepository";
import verifyToken from "../../middleware/authMiddleware";



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

// login
router.post('/login', authController.login.bind(authController));

// refresh token
router.post('/refresh-token', authController.refreshToken.bind(authController));

// reset password
router.post('/reset-password', authController.resetPassword.bind(authController));

// change password
router.post('/change-password', authController.changePassword.bind(authController));

// forgot password
router.post('/forgot-password', authController.forgotPassword.bind(authController));

// verify forgot password otp
router.post('/verify-forgot-password-otp', authController.verifyForgotPasswordOTP.bind(authController));

router.post('/logout', verifyToken, authController.logout.bind(authController))

// router.get('/users', authController.getAllUsers.bind(authController));

export default router;