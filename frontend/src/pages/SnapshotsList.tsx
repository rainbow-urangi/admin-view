import { useEffect, useState } from "react";
import api from "../api/axios";
import DataTable from "../components/DataTable";

export default function SnapshotsList() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get("/snapshots").then((res) => setRows(res.data));
  }, []);

  const columns = [
    { key: "event_id", label: "Event ID" },
    { key: "dom_before", label: "Before (Preview)" },
    { key: "dom_after", label: "After (Preview)" },
    { key: "api_response_body", label: "api_response_body" }
  ];

  return (
    <div className="container mt-4">
      <h3>Snapshots</h3>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
