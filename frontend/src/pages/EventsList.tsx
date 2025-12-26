import { useEffect, useState } from "react";
import api from "../api/axios";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

interface EventRow {
  id: number;
  task_id: number;
  event_time: string;
  event_type: string;
  page_url: string;
}

export default function EventsList() {
  const [rows, setRows] = useState<EventRow[]>([]);
  const [page, setPage] = useState(1);
  const limit = 50;
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const load = async (pageNum = 1) => {
    const res = await api.get(`/events?page=${pageNum}&limit=${limit}`);
    setRows(res.data.rows);
    setTotal(res.data.total);
    setPage(res.data.page);
  };

  useEffect(() => {
    load(1);
  }, []);

  const columns = [
    { key: "id", label: "ID" },
    { key: "task_id", label: "Task Id" },
    { key: "event_time", label: "Event Time" },
    { key: "event_type", label: "Event Type" },
    { key: "page_url", label: "Page URL" },
    { key: "api_method", label: "api_method" },
    { key: "api_status_code", label: "api_status_code" }
  ];

  const onRowClick = (row: EventRow) => {
    navigate(`/events/${row.id}`);
  };

  return (
    <div className="container mt-4">
      <h3>Events</h3>

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
