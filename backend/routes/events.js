import express from "express";
import pool from "../config/db.js";
import { authRequired } from "../middlewares/auth.js";

const router = express.Router();

/* -------------------- events 목록 조회 -------------------- */
router.get("/", authRequired, async (req, res) => {
  const { page = 1, limit = 50, task_id, event_type, keyword } = req.query;

  const offset = (page - 1) * limit;

  let where = `WHERE 1=1`;
  const params = [];

  if (task_id) {
    where += " AND task_id = ?";
    params.push(task_id);
  }

  if (event_type) {
    where += " AND event_type = ?";
    params.push(event_type);
  }

  if (keyword) {
    where += ` AND (page_url LIKE ? OR interaction_type LIKE ? OR data_testid LIKE ?)`;
    params.push(`%${keyword}%`, `%${keyword}%`, `%${keyword}%`);
  }

  // ⭐ total count 조회
  const totalQuery = await pool.query(
    `SELECT COUNT(*) AS total FROM events ${where}`,
    params
  );
  const total = totalQuery[0][0].total;

  // ⭐ 실제 페이지 데이터 조회
  const [rows] = await pool.query(
    `SELECT * FROM events ${where} ORDER BY event_time DESC LIMIT ? OFFSET ?`,
    [...params, Number(limit), Number(offset)]
  );

  res.json({
    rows,
    total,
    page: Number(page),
    limit: Number(limit)
  });
});

/* -------------------- 개별 event 조회 -------------------- */
router.get("/:id", authRequired, async (req, res) => {
  const { id } = req.params;

  const [rows] = await pool.query(
    "SELECT * FROM events WHERE id = ?",
    [id]
  );

  if (rows.length === 0) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});

export default router;
