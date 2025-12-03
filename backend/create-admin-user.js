import "dotenv/config";
import readline from "readline";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import pool from "./config/db.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  try {
    const email = await ask("Admin email 입력: ");

    if (!email) {
      console.log("❌ 이메일은 필수입니다.");
      process.exit(1);
    }

    let password = await ask("비밀번호 입력 (Enter 시 자동 생성): ");

    if (!password) {
      password = crypto.randomBytes(4).toString("hex"); // ex: af63b92a
      console.log(`자동 생성된 비밀번호: ${password}`);
    }

    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO admin_users (email, password_hash, role)
       VALUES (?, ?, 'ADMIN')
       ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
      [email, hash]
    );

    console.log("\n✅ 관리자 계정 생성 완료!");
    console.log("Email:", email);
    console.log("Password:", password);

  } catch (err) {
    console.error("❌ 에러 발생:", err);
  } finally {
    rl.close();
    process.exit();
  }
}

main();
