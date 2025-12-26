import { useEffect, useState } from "react";
import api from "../api/axios";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

export default function SnapshotsList() {
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const limit = 50;
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const load = async (pageNum = 1) => {
    const res = await api.get(`/snapshots?page=${pageNum}&limit=${limit}`);
    setRows(res.data.rows);
    setTotal(res.data.total);
    setPage(res.data.page);
  };

  useEffect(() => {
    load(1);
  }, []);

  const columns = [
    { key: "event_id", label: "Event ID" },
    { key: "dom_before", label: "DOM Before (Preview)" },
    { key: "dom_after", label: "DOM After (Preview)" },
    { key: "api_response_body", label: "API Response (Preview)" }
  ];

  const onRowClick = (row: any) => {
    navigate(`/snapshots/${row.event_id}`);
  };

  return (
    <div className="container mt-4">
      <h3>Snapshots</h3>

      <DataTable 
        columns={columns} 
        data={rows} 
        onRowClick={onRowClick} 
      />

      <Pagination 
        page={page}
        limit={limit}
        total={total}
        onPageChange={load}
      />
    </div>
  );
}
