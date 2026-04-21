import { Router } from "express";
import { getAllUsersAdmin, getAllTasksAdmin, deleteUserAdmin, deleteTaskAdmin, updateUserRoleByAdmin } from "../controllers/admin.controller.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();

router.use(authMiddleware, adminMiddleware);


router.get('/users', getAllUsersAdmin)
router.delete('/users/:id', deleteUserAdmin)
router.put('/users/:id/role', updateUserRoleByAdmin) // Add Route to change user role

router.get('/tasks', getAllTasksAdmin)
router.delete('/tasks/:id', deleteTaskAdmin)



export default router