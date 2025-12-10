import { useEffect, useState } from "react";
import api from "../api/axios";
import DataTable from "../components/DataTable";

export default function SessionsList() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get("/sessions").then((res) => setRows(res.data));
  }, []);

  const columns = [
    { key: "id", label: "ID" },
    { key: "user_id", label: "User" },
    { key: "tenant_id", label: "tenant_id" },
    { key: "end_time", label: "end_time" },
    { key: "user_agent", label: "user_agent" },
    { key: "browser_id", label: "browser_id" },
    { key: "viewport_size", label: "viewport_size" },
    { key: "viewport_width", label: "viewport_width" },
    { key: "viewport_height", label: "viewport_height" },
    { key: "ip_address", label: "ip_address" }
  ];

  return (
    <div className="container mt-4">
      <h3>Sessions</h3>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
