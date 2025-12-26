import { useEffect, useState } from "react";
import api from "../api/axios";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

export default function AZEventsList() {
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const limit = 50;
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const load = async (pageNum = 1) => {
    const res = await api.get(`/az-events?page=${pageNum}&limit=${limit}`);
    setRows(res.data.rows);
    setTotal(res.data.total);
    setPage(res.data.page);
  };

  useEffect(() => {
    load(1);
  }, []);

  const columns = [
    { key: "id", label: "ID" },
    { key: "AZ_event_time", label: "Event Time" },
    { key: "AZ_api_url", label: "API URL" },
    { key: "AZ_api_method", label: "API Method" },
    { key: "AZ_api_status", label: "API Status" },
    { key: "AZ_api_path", label: "API Path" },
    { key: "AZ_ip_address", label: "IP Address" },
    { key: "AZ_login_id", label: "Login ID" },
    { key: "AZ_element_type", label: "Element Type" },
    ];

  const onRowClick = (row: any) => {
    navigate(`/az-events/${row.id}`);
  };

  return (
    <div className="container mt-4">
      <h3>AZ Events</h3>

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
