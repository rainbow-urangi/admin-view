import { useEffect, useState } from "react";
import api from "../api/axios";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

export default function SessionsList() {
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const limit = 50;
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const load = async (pageNum = 1) => {
    const res = await api.get(`/sessions?page=${pageNum}&limit=${limit}`);
    setRows(res.data.rows);
    setTotal(res.data.total);
    setPage(res.data.page);
  };

  useEffect(() => {
    load(1);
  }, []);

  const columns = [
    { key: "id", label: "ID" },
    { key: "user_id", label: "User" },
    { key: "tenant_id", label: "Tenant" },
    { key: "start_time", label: "Start Time" },
    { key: "end_time", label: "End Time" },
    { key: "browser_id", label: "Browser ID" },
    { key: "viewport_size", label: "Viewport Size" },
    { key: "viewport_width", label: "Width" },
    { key: "viewport_height", label: "Height" },
    { key: "ip_address", label: "IP" },
  ];

  const onRowClick = (row: any) => {
    navigate(`/sessions/${row.id}`);
  };

  return (
    <div className="container mt-4">
      <h3>Sessions</h3>

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
