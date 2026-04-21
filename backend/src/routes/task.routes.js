import { Router } from "express";
import { createTask, getTasks, deleteTask, updateTask } from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware)

router.post('/', createTask)
router.get('/', getTasks)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)


export default router
