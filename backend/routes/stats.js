import express from "express";
import pool from "../config/db.js";
import { authRequired } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", authRequired, async (req, res) => {
  try {
    const tables = [
      "events",
      "az_events",
      "sessions",
      "tasks",
      "snapshots",
      "process_steps",
      "process_templates",
      "data_patterns",
      "element_profiles",
      "admin_users"
    ];

    const results = {};

    for (const table of tables) {
      const [rows] = await pool.query(`SELECT COUNT(*) AS cnt FROM ${table}`);
      results[table] = rows[0].cnt;
    }

    res.json(results);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
