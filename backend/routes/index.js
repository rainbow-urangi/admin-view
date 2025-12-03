import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Admin API server is running" });
});

// DB 연결 테스트
router.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS now");
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB connection failed" });
  }
});

export default router;
