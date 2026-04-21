import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getMe, registerUser, loginUser, updateProfile } from "../controllers/user.controller.js";

const router = Router();



router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', authMiddleware, getMe)
router.put('/me', authMiddleware, updateProfile)

export default router