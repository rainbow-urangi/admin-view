import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function TaskDetail() {
  const { id } = useParams();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    api.get(`/tasks/${id}`).then(res => setItem(res.data));
  }, [id]);

  if (!item) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h3>Task Detail (ID: {id})</h3>
      <pre className="bg-light p-3 rounded" style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(item, null, 2)}
      </pre>
    </div>
  );
}
