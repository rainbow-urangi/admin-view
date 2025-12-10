import express from "express";
import pool from "../config/db.js";
import { authRequired } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authRequired, async (req, res) => {
  const { limit = 50, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  const [rows] = await pool.query(
    `SELECT * FROM tasks ORDER BY start_time DESC LIMIT ? OFFSET ?`,
    [Number(limit), Number(offset)]
  );

  res.json(rows);
});

export default router;
