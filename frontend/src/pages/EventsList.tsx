import { useEffect, useState } from "react";
import api from "../api/axios";
import DataTable from "../components/DataTable";

interface EventRow {
  id: number;
  event_time: string;
  event_type: string;
  page_url: string;
}

export default function EventsList() {
  const [rows, setRows] = useState<EventRow[]>([]);

  useEffect(() => {
    api.get("/events?limit=50").then((res) => setRows(res.data));
  }, []);

  const columns = [
    { key: "id", label: "ID" },
    { key: "task_id", label: "Task Id" },
    { key: "event_time", label: "Event Time" },
    { key: "event_type", label: "Event Type" },
    { key: "page_url", label: "Page URL" },
    { key: "target_selector", label: "target_selector" },
    { key: "locators_json", label: "locators_json" },
    { key: "data_testid", label: "data_testid" },
    { key: "element_tag", label: "element_tag" },
    { key: "selector_xpath", label: "selector_xpath" },
    { key: "interaction_type", label: "interaction_type" },
    { key: "input_data", label: "input_data" },
    { key: "api_path", label: "api_path" },
    { key: "api_method", label: "api_method" },
    { key: "api_status_code", label: "api_status_code" }
  ];

  return (
    <div className="container mt-4">
      <h3>Events</h3>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
