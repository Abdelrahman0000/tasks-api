import express from "express";
import { pool } from "./db.js";
import taskRoutes from "./routes/task.routes.js";
import "dotenv/config";



const PORT = Number(process.env.PORT) || 3000;

const app = express();

app.use(express.json());
app.use("/tasks", taskRoutes);

app.listen(PORT, async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Database connected:", result.rows[0]);
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});