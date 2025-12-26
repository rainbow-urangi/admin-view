import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import { mailer } from "../config/mail.js";
import crypto from "crypto";
import { authRequired } from "../middlewares/auth.js";


const router = express.Router();

/* -------------------- 1) 로그인 -------------------- */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [users] = await pool.query(
    "SELECT * FROM admin_users WHERE email = ?",
    [email]
  );
  if (users.length === 0) return res.status(400).json({ error: "Invalid email" });

  const user = users[0];

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(400).json({ error: "Wrong password" });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

/* -------------------- 2) 초대 이메일 보내기 -------------------- */
router.post("/invite", async (req, res) => {
  const { email } = req.body;

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "3d" });
  const link = `${process.env.BASE_URL}/signup?token=${token}`;

  await mailer.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Admin 초대",
    text: `가입 링크: ${link}`,
    html: `<a href="${link}">관리자 가입하기</a>`
  });

  await pool.query(
    "INSERT INTO admin_users (email, invited_at) VALUES (?, NOW()) ON DUPLICATE KEY UPDATE invited_at=NOW()",
    [email]
  );

  res.json({ success: true });
});

/* -------------------- 3) 초대 링크 기반 회원가입 -------------------- */
router.post("/register", async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      "UPDATE admin_users SET password_hash = ? WHERE email = ?",
      [hash, email]
    );

    res.json({ success: true });
  } catch {
    res.status(400).json({ error: "Invalid or expired token" });
  }
});

// 단순 관리자 생성: email → 자동 비밀번호 생성
router.post("/create-simple-user", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "email required" });

  // 8자리 랜덤 비밀번호 생성
  const generatedPassword = crypto.randomBytes(4).toString("hex"); // 예: "af9c3b28"

  const hash = await bcrypt.hash(generatedPassword, 10);

  try {
    // DB 삽입
    await pool.query(
      `INSERT INTO admin_users (email, password_hash, role)
       VALUES (?, ?, 'ADMIN')
       ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
      [email, hash]
    );

    return res.json({
      success: true,
      email,
      generatedPassword
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create account" });
  }
});

// 화면에서 관리자 생성
router.post("/create-user", authRequired, async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "email and password are required" });

  const hash = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      `INSERT INTO admin_users (email, password_hash, role)
       VALUES (?, ?, 'ADMIN')
       ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
      [email, hash]
    );

    return res.json({
      success: true,
      email,
      password,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create account" });
  }
});


export default router;
