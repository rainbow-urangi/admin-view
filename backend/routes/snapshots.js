import express from "express";
import pool from "../config/db.js";
import { authRequired } from "../middlewares/auth.js";

const router = express.Router();

// ⭐ 목록 조회 (pagination)
router.get("/", authRequired, async (req, res) => {
  const { limit = 50, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  const [[{ total }]] = await pool.query(
    `SELECT COUNT(*) AS total FROM snapshots`
  );

  const [rows] = await pool.query(
    `SELECT event_id, 
            LEFT(dom_before, 200) AS dom_before, 
            LEFT(dom_after, 200) AS dom_after,
            LEFT(api_response_body, 200) AS api_response_body
     FROM snapshots
     ORDER BY event_id DESC
     LIMIT ? OFFSET ?`,
    [Number(limit), Number(offset)]
  );

  res.json({
    rows,
    total,
    page: Number(page),
    limit: Number(limit)
  });
});

// ⭐ 상세 조회
router.get("/:event_id", authRequired, async (req, res) => {
  const { event_id } = req.params;

  const [rows] = await pool.query(
    `SELECT * FROM snapshots WHERE event_id = ?`,
    [event_id]
  );

  if (!rows.length) return res.status(404).json({ error: "Not found" });

  res.json(rows[0]);
});

export default router;
