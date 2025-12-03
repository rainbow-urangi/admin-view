import express from "express";
import pool from "../config/db.js";
import { authRequired } from "../middlewares/auth.js";

const router = express.Router();

/* -------------------- admin 사용자 목록 -------------------- */
router.get("/", authRequired, async (req, res) => {
  const [rows] = await pool.query("SELECT id, email, role, invited_at, created_at FROM admin_users");
  res.json(rows);
});

export default router;
