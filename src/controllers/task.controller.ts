import { Request, Response } from "express";
import { pool } from "../db.js";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};


export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, completed } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ message: "title is required" });
    }

    if (completed !== undefined && typeof completed !== "boolean") {
      return res.status(400).json({
        message: "completed must be a boolean",
      });
    }

    const result = await pool.query(
      `INSERT INTO tasks (title, completed)
       VALUES ($1, $2)
       RETURNING *`,
      [title.trim(), completed ?? false]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create task" });
  }
};
export const updateTask = async (req: Request, res: Response) => {
  const taskId = Number(req.params.id);

  try {
    if (!Number.isInteger(taskId) || taskId <= 0) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const { title, completed } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ message: "title is required" });
    }

    if (typeof completed !== "boolean") {
      return res.status(400).json({
        message: "completed must be a boolean",
      });
    }

    const result = await pool.query(
      `UPDATE tasks
       SET title = $1, completed = $2
       WHERE id = $3
       RETURNING *`,
      [title.trim(), completed, taskId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "task not found" });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update task" });
  }
};
export const deleteTask = async (req: Request, res: Response) => {
    
    const taskId = Number(req.params.id);
    try{
          if (!Number.isInteger(taskId) || taskId <= 0) {
  return res.status(400).json({ message: "Invalid task ID" });
}
   const result = await pool.query(
  `DELETE FROM tasks WHERE id = $1 RETURNING *`,
  [taskId]
);

if (result.rows.length === 0) {
  return res.status(404).json({ message: "task not found" });
}
return res.status(200).json({message:'task deleted successfully'})
}    catch(error){
        console.error(error);
        res.status(500).json({ message: "Failed to delete task" })
    }

};
