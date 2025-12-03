import { useState } from "react";
import api from "../api/axios";

export default function CreateSimpleUser() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<{email: string, generatedPassword: string} | null>(null);

  const handleCreate = async () => {
    const res = await api.post("/auth/create-simple-user", { email });
    setResult(res.data);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>간단 계정 생성</h3>

      <input
        className="form-control mt-3"
        placeholder="email 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="btn btn-primary mt-3 w-100" onClick={handleCreate}>
        계정 생성
      </button>

      {result && (
        <div className="alert alert-success mt-3">
          <p>계정 생성 완료!</p>
          <p><b>Email:</b> {result.email}</p>
          <p><b>Password:</b> {result.generatedPassword}</p>
        </div>
      )}
    </div>
  );
}
