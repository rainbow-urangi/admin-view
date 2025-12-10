import { useEffect, useState } from "react";
import api from "../api/axios";
import DataTable from "../components/DataTable";

export default function TasksList() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get("/tasks").then((res) => setRows(res.data));
  }, []);

  const columns = [
    { key: "id", label: "ID" },
    { key: "session_id", label: "Session" },
    { key: "task_name", label: "Task Name" },
    { key: "status", label: "Status" },
    { key: "start_time", label: "Start" },
    { key: "end_time", label: "End" },
    { key: "duration_ms", label: "Duration (ms)" }
  ];

  return (
    <div className="container mt-4">
      <h3>Tasks</h3>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
