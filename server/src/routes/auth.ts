import express from 'express';
import { sendOtp, verifyOtp, signup } from '../controllers/authController';

export const authRouter = express.Router();

authRouter.post('/send-otp', sendOtp);
authRouter.post('/verify-otp', verifyOtp);
authRouter.post('/signup', signup);
