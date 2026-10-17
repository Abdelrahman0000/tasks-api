import { Router } from "express";
import { pool } from "../db.js";
import { getTasks , createTask ,  updateTask, deleteTask } from "../controllers/task.controller.js";

const router = Router();


router.get("/", getTasks);

router.post("/",createTask); 
router.put('/:id',updateTask)
router.delete('/:id',deleteTask)

export default router;