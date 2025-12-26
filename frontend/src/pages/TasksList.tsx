import { useEffect, useState } from "react";
import api from "../api/axios";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

export default function TasksList() {
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const limit = 50;
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const load = async (pageNum = 1) => {
    const res = await api.get(`/tasks?page=${pageNum}&limit=${limit}`);
    setRows(res.data.rows);
    setTotal(res.data.total);
    setPage(res.data.page);
  };

  useEffect(() => {
    load(1);
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

  const onRowClick = (row: any) => {
    navigate(`/tasks/${row.id}`);
  };

  return (
    <div className="container mt-4">
      <h3>Tasks</h3>

      <DataTable columns={columns} data={rows} onRowClick={onRowClick} />

      <Pagination 
        page={page}
        limit={limit}
        total={total}
        onPageChange={load}
      />
    </div>
  );
}
