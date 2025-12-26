import { useEffect, useState } from "react";
import api from "../api/axios";

interface User {
  id: number;
  email: string;
  role: string;
  invited_at: string;
  created_at: string;
}

export default function UserManagement() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState("");

  const loadUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  const handleCreate = async () => {
    if (!email || !password) {
      setMessage("이메일과 비밀번호를 모두 입력하세요.");
      return;
    }

    const res = await api.post("/auth/create-user", {
      email,
      password
    });

    setMessage(`계정 생성 완료: ${res.data.email}`);
    setEmail("");
    setPassword("");
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h3>유저 관리</h3>

      {/* 계정 생성 폼 */}
      <div className="card p-3 mt-4" style={{ maxWidth: "500px" }}>
        <h5>새 계정 생성</h5>

        <input
          className="form-control mt-2"
          placeholder="Email 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mt-2"
          placeholder="Password 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary mt-3" onClick={handleCreate}>
          계정 생성
        </button>

        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>

      {/* 계정 목록 */}
      <div className="mt-5">
        <h5>관리자 목록</h5>
        <table className="table table-bordered mt-2">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.created_at}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  );
}
