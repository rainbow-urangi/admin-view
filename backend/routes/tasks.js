import express from "express";
import pool from "../config/db.js";
import { authRequired } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authRequired, async (req, res) => {
  const { limit = 50, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  // ⭐ total count
  const [[{ total }]] = await pool.query(
    `SELECT COUNT(*) AS total FROM tasks`
  );

  // ⭐ rows
  const [rows] = await pool.query(
    `SELECT * FROM tasks ORDER BY start_time DESC LIMIT ? OFFSET ?`,
    [Number(limit), Number(offset)]
  );

  res.json({
    rows,
    total,
    page: Number(page),
    limit: Number(limit)
  });
});

router.get("/:id", authRequired, async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query(
    "SELECT * FROM tasks WHERE id = ?",
    [id]
  );
  if (!rows.length) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});

export default router;
